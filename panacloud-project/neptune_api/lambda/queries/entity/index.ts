import * as gremlin from 'gremlin';
const identityVerifier = require('/opt/cognitoAuthentication')


import {FetchMyCompaniesInput,GetEntityProfileInput,GetUsersListInput} from '../../graphqlSchemaTypes';

import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;

const { edge, vertex } = hackolade_graphdb
const { t, P } = gremlin.process;

const __ = gremlin.process.statics
const id = gremlin.process.t.id
const neq = gremlin.process.P.neq


export async function fetchMyCompanies(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchMyCompaniesInput, cognitoUsername: string) {
  const { userId, pageNumber, pageSize } = data;


  
  const errorString1 = `inputs "userId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`



  if (!userId || !pageSize ||! pageNumber) {
    throw new Error(errorString1)
  }

  const confirmUser = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


  if (!confirmUser) {

    throw new Error(errorString2)

  }

  if (pageNumber < 1) {

    throw new Error(errorString3)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;

  const count = await g.V(userId).out(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).hasLabel(vertex.company.L).count().next()

  const companies = await g.V(userId).out(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).hasLabel(vertex.company.L).range(offset, pageNumber * limit)
    .project('id', 'name', 'city', 'country', 'picture_url', 'owner', 'total_followers', "profileStatus")
    .by(id)
    .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(
      __.in_(edge.OWNER.L)
        .project('id', "firstName","lastName", 'picture_url')
        .by(id)
        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    )
    .by(__.inE(edge.follows.L).fold().coalesce(__.unfold().count(), __.constant(0)))
    .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
    .toList()

  console.log(companies);

  const output = { count: count.value, companies: companies }


  return output;

}






export const getEntityProfile = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetEntityProfileInput, cognitoUsername: string) => {

  const { requesterEntityId, requestedEntityId } = data

  const errorString1 = `inputs "requesterEntityId", "pageSize" and "requestedEntityId" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = 'requested entity not found'
  const errorString4 = `requester entity do not have access to the requested entity's profile`



  if (!requesterEntityId || !requestedEntityId ) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, requesterEntityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }

  if (requesterEntityId !== requestedEntityId) {


    const requesterType = await g.V(requesterEntityId).label().next()
    const requestedType = await g.V(requestedEntityId).hasLabel(vertex.company.L, vertex.user.L).label().next()

    if (requestedType.value == null) {
      throw new Error(errorString3)
    }

    console.log(requesterType)
    console.log(requestedType)

    if (requesterType.value === vertex.user.L && requestedType.value === vertex.company.L) {

      const errorHandling1 = await g.V(requesterEntityId).coalesce(__.out(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).hasId(requestedEntityId)
        , __.choose(__.V(requestedEntityId).out(edge.has_status.L).values(vertex.profileStatus.prop.name.N).is(neq(vertex.profileStatus.prop.name.V.PUBLISHED)), __.constant(errorString4)
        )).next()

      if (errorHandling1.value == errorString4) {
        throw new Error(errorString4)
      }


    }

    else {

      const errorHandling2 = await g.V(requestedEntityId)
        .choose(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N).is(neq(vertex.profileStatus.prop.name.V.PUBLISHED)), __.constant(errorString4)).next()

      if (errorHandling2.value == errorString4) {
        throw new Error(errorString4)
      }

    }





  }



  const result = await g
    .V(requestedEntityId)
    .choose(
      __.hasLabel("company"),
      __.project(
        "__typename",
        "id",
        "profileStatus",
        "name",
        "city",
        "country",
        "email",
        "phone_number",
        "picture_url",
        "headline",
        "total_followers",
        "total_following",
        "owner",
        "developers",
        "other_employees",

      )
        .by(__.constant('companyFullProfileInfo'))
        .by(id)
        .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
        .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.company.prop.email.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(
          __.values(vertex.company.prop.phoneNumber.N)
            .fold()
            .coalesce(__.unfold(), __.constant(""))
        )
        .by(
          __.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant(""))
        )
        .by(__.values(vertex.company.prop.headline.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.in_(edge.follows.L).count())
        .by(__.out(edge.follows.L).count())
        .by(
          __.in_(edge.OWNER.L)
            .project(
              "id",
              "firstName",
              "lastName",
              "city",
              "country",
              "email",
              "phone_number",
              "picture_url",
              "company_relation_info",
              "total_followers",
              "profileStatus"
            )
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(
              __.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.phoneNumber.N)
                .fold()
                .coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.pictureUrl.N)
                .fold()
                .coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.outE(edge.OWNER.L).where(__.inV().hasId(requestedEntityId))
                .project("role", "date_added")
                .by(__.label())
                .by(__.values(edge.OWNER.prop.timeStamp.N).fold().coalesce(__.unfold(), __.constant("")))
            )
            .by(__.inE(edge.follows.L).count())
            .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
        )
        .by(
          __.in_(edge.DEVELOPER.L)
            .project(
              "id",
              "firstName",
              "lastName",
              "city",
              "country",
              "email",
              "phone_number",
              "picture_url",
              "company_relation_info",
              "total_followers",
              "profileStatus"
            )
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(
              __.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.phoneNumber.N)
                .fold()
                .coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.pictureUrl.N)
                .fold()
                .coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.outE(edge.DEVELOPER.L).where(__.inV().hasId(requestedEntityId))
                .project("role", "date_added")
                .by(__.label())
                .by(__.values(edge.DEVELOPER.prop.timeStamp.N).fold().coalesce(__.unfold(), __.constant("")))
            )
            .by(__.inE(edge.follows.L).count())
            .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
            .fold()
        )
        .by(
          __.in_(edge.OTHER_EMPLOYEE.L)
            .project(
              "id",
              "firstName",
              "lastName",
              "city",
              "country",
              "email",
              "phone_number",
              "picture_url",
              "company_relation_info",
              "total_followers",
              "profileStatus"
            )
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(
              __.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.phoneNumber.N)
                .fold()
                .coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.values(vertex.user.prop.pictureUrl.N)
                .fold()
                .coalesce(__.unfold(), __.constant(""))
            )
            .by(
              __.outE(edge.OTHER_EMPLOYEE.L).where(__.inV().hasId(requestedEntityId))
                .project("role", "date_added")
                .by(__.label())
                .by(__.values(edge.OTHER_EMPLOYEE.prop.timeStamp.N).fold().coalesce(__.unfold(), __.constant("")))
            )
            .by(__.inE(edge.follows.L).count())
            .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
            .fold()
        ),
      __.project(
        "__typename",
        "id",
        "firstName",
        "lastName",
        "city",
        "country",
        "email",
        "phone_number",
        "picture_url",
        "headline",
        "total_followers",
        "total_following",
        "profileStatus",

      )
        .by(__.constant('userFullProfileInfo'))
        .by(id)
        .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(
          __.values(vertex.user.prop.phoneNumber.N)
            .fold()
            .coalesce(__.unfold(), __.constant(""))
        )
        .by(
          __.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant(""))
        )
        .by(__.values(vertex.user.prop.headline.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.in_(edge.follows.L).count())
        .by(__.out(edge.follows.L).count())
        .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))

    )
    .next();
  console.log(result);
  return result.value;
};




export async function getUsersList(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>,data:GetUsersListInput) {
  const { pageNumber, pageSize } = data;

  const errorString1 = `inputs "pageNumber", "pageSize" and "pageSize" cannot be empty strings`
  const errorString2 = `the page number starts from 1`


  if (!pageNumber || !pageSize ) {
    throw new Error(errorString1)
  }

  
  if (pageNumber < 1) {

    throw new Error(errorString2)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;


  const count = await g.V().hasLabel(vertex.user.L).count().next()


  const users = await g.V().hasLabel(vertex.user.L).range(offset, pageNumber * limit)
 .project(
    "id",
    "firstName",
    "lastName",
    "city",
    "country",
    "picture_url",
    "headline",
    "total_followers",
    "total_following",
    "profileStatus",

  )
    .by(id)
    .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(
      __.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant(""))
    )
    .by(__.values(vertex.user.prop.headline.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(__.in_(edge.follows.L).count())
    .by(__.out(edge.follows.L).count())
    .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N)).toList()


    const output = { count: count.value, users: users }


    console.log(output)
    return output
}

