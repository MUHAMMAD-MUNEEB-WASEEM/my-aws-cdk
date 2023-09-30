import * as gremlin from 'gremlin';
const identityVerifier = require('/opt/cognitoAuthentication')


import {FetchMyCompaniesInput,GetEntityProfileInput,GetUsersListInput,GetUsersListInCompanyInput,GetRecommendationRequestsByMeInput, GetRecommendationRequestsForMeInput, GetRecommendationsForMeInput, GetRecommendationRequestsByMeOutput} from '../../graphqlSchemaTypes';

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

  //const errorString1 = `inputs "requesterEntityId" and "requestedEntityId" cannot be empty strings`
  const errorString1 = "please enter the requesterEntityId"
  const errorString2 = "an invalid error occured"
  const errorString3 = 'requested entity not found'
  const errorString4 = `requester entity do not have access to the requested entity's profile`
  const errorString5 = "you are not logged in"


  if (!cognitoUsername && requesterEntityId){
    throw new Error(errorString5)

  }

  if (cognitoUsername && !requesterEntityId){
    throw new Error(errorString1)

  }


  // if (!requesterEntityId || !requestedEntityId ) {
  //   throw new Error(errorString1)
  // }

  if (cognitoUsername && requesterEntityId){

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, requesterEntityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }

}

  if (requesterEntityId !== requestedEntityId) {

    if (!cognitoUsername){
      const checkrequestedId = await g.V(requestedEntityId).hasLabel(vertex.company.L, vertex.user.L).label().next()

      
    if (checkrequestedId.value == null) {
      throw new Error(errorString3)
    }
    }

    else{

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
  }

  if (cognitoUsername){
    
  const result = await g
  .V(requestedEntityId)
  .choose(__.hasId(requesterEntityId)
  ,__.choose(
    __.hasLabel(vertex.company.L),
    __.project(
      "__typename",
      "id",
      "profileStatus",
      "name",
      "city",
      "email",
      "phone_number",
      "country",
      "picture_url",
      "headline",
      "total_followers",
      "total_following",
      "owner",

    )
      .by(__.constant('companyFullProfileInfo'))
      .by(id)
      .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
      .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.email.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant("")))

      .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
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
            "picture_url",
          )
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(
            __.values(vertex.user.prop.pictureUrl.N)
              .fold()
              .coalesce(__.unfold(), __.constant(""))
          )
      )
    
      ,
    __.project(
      "__typename",
      "id",
      "firstName",
      "lastName",
      "city",
      "email",
      "phone_number",
      "country",
      "picture_url",
      "headline",
      "total_followers",
      "total_following",
      "profileStatus",
      "education",
      "workExperience"

    )
      .by(__.constant('userFullProfileInfo'))
      .by(id)
      .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant("")))

      .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(
        __.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant(""))
      )
      .by(__.values(vertex.user.prop.headline.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.in_(edge.follows.L).count())
      .by(__.out(edge.follows.L).count())
      .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
     
      .by(__.out('has_education')
      .project("startDate","endDate","city","country","institute","completed","degree_name","education_level","field_of_study","grade")
      .by(__.values('startDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('endDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('city').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('country').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('institute').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('completed').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('degree_name').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('education_level').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('field_of_study').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('grade').fold().coalesce(__.unfold(), __.constant(''))).fold()

      )
      .by(__.out('has_workExperience')
      .project("startDate","endDate","city","country","company","currentlyWorking","jobTitle","employmentType")
      .by(__.values('startDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('endDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('city').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('country').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('company').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('currentlyWorking').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('jobTitle').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('employmentType').fold().coalesce(__.unfold(), __.constant(''))).fold()

      )
  )
  ,__.choose(
    __.hasLabel(vertex.company.L),
    __.project(
      "__typename",
      "id",
      "profileStatus",
      "name",
      "city",
      "email",
      "phone_number",
      "country",
      "picture_url",
      "headline",
      "total_followers",
      "total_following",
      "owner",
      "following"

    )
      .by(__.constant('companyFullProfileInfo'))
      .by(id)
      .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
      .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.email.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant("")))

      .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
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
            "picture_url",
          )
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(
            __.values(vertex.user.prop.pictureUrl.N)
              .fold()
              .coalesce(__.unfold(), __.constant(""))
          )
      )
      .by(__.choose(__.in_(edge.follows.L).hasId(requesterEntityId),__.constant(true),__.constant(false))
      )
      ,
    __.project(
      "__typename",
      "id",
      "firstName",
      "lastName",
      "city",
      "email",
      "phone_number",
      "country",
      "picture_url",
      "headline",
      "total_followers",
      "total_following",
      "profileStatus",
      "following",
      "education",
      "workExperience"

    )
      .by(__.constant('userFullProfileInfo'))
      .by(id)
      .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant("")))

      .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(
        __.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant(""))
      )
      .by(__.values(vertex.user.prop.headline.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.in_(edge.follows.L).count())
      .by(__.out(edge.follows.L).count())
      .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
      .by(__.choose(__.in_(edge.follows.L).hasId(requesterEntityId),__.constant(true),__.constant(false))
      )
      .by(__.out('has_education')
      .project("startDate","endDate","city","country","institute","completed","degree_name","education_level","field_of_study","grade")
      .by(__.values('startDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('endDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('city').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('country').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('institute').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('completed').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('degree_name').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('education_level').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('field_of_study').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('grade').fold().coalesce(__.unfold(), __.constant(''))).fold()

      )
      .by(__.out('has_workExperience')
      .project("startDate","endDate","city","country","company","currentlyWorking","jobTitle","employmentType")
      .by(__.values('startDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('endDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('city').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('country').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('company').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('currentlyWorking').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('jobTitle').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('employmentType').fold().coalesce(__.unfold(), __.constant(''))).fold()

      )
  )
  ).next()


  console.log(result);



  return result.value;
}

else{

console.log("GG",requestedEntityId)

  const result = await g
  .V(requestedEntityId)
  .choose(
    __.hasLabel(vertex.company.L),
    __.project(
      "__typename",
      "id",
      "profileStatus",
      "name",
      "city",
      "email",
      "phone_number",
      "country",
      "picture_url",
      "headline",
      "total_followers",
      "total_following",
      "owner",

    )
      .by(__.constant('companyFullProfileInfo'))
      .by(id)
      .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
      .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.email.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant("")))

      .by(__.values(vertex.company.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
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
            "picture_url",
          )
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(
            __.values(vertex.user.prop.pictureUrl.N)
              .fold()
              .coalesce(__.unfold(), __.constant(""))
          )
      )
    
      ,
    __.project(
      "__typename",
      "id",
      "firstName",
      "lastName",
      "city",
      "email",
      "phone_number",
      "country",
      "picture_url",
      "headline",
      "total_followers",
      "total_following",
      "profileStatus",
      "education",
      "workExperience"

    )
      .by(__.constant('userFullProfileInfo'))
      .by(id)
      .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.email.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.phoneNumber.N).fold().coalesce(__.unfold(), __.constant("")))

      .by(__.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(
        __.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant(""))
      )
      .by(__.values(vertex.user.prop.headline.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.in_(edge.follows.L).count())
      .by(__.out(edge.follows.L).count())
      .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
    
      .by(__.out('has_education')
      .project("startDate","endDate","city","country","institute","completed","degree_name","education_level","field_of_study","grade")
      .by(__.values('startDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('endDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('city').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('country').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('institute').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('completed').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('degree_name').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('education_level').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('field_of_study').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('grade').fold().coalesce(__.unfold(), __.constant(''))).fold()

      )
      .by(__.out('has_workExperience')
      .project("startDate","endDate","city","country","company","currentlyWorking","jobTitle","employmentType")
      .by(__.values('startDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('endDate').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('city').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('country').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('company').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('currentlyWorking').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('jobTitle').fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values('employmentType').fold().coalesce(__.unfold(), __.constant(''))).fold()

      )
  ).next()



  console.log(result);



  return result.value;

}
  
  






};




export async function getUsersList(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>,data:GetUsersListInput,cognitoUsername: string) {
  const { pageNumber, pageSize,userId } = data;

  const errorString1 = `inputs "pageNumber", "pageSize" and "pageSize" cannot be empty strings`
  const errorString2 = `the page number starts from 1`
  const errorString3 = "an invalid error occured"
  const errorString4 = "please enter the entityId"
  const errorString5 = "you are not logged in"


  if (!cognitoUsername && userId){
    throw new Error(errorString5)

  }

  if (cognitoUsername && !userId){
    throw new Error(errorString4)

  }

  if (cognitoUsername && userId){
    
    const confirmEntity = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


    if (!confirmEntity) {
  
      throw new Error(errorString3)
  
    }
  }



  if (!pageNumber || !pageSize ) {
    throw new Error(errorString1)
  }

  
  if (pageNumber < 1) {

    throw new Error(errorString2)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;


  const count = await g.V().hasLabel(vertex.user.L).where(__.out(edge.has_status.L).hasId(vertex.profileStatus.prop.id.V.profileStatusPublished)).count().next()


  if (cognitoUsername){

    const users = await g.V().hasLabel(vertex.user.L).where(__.out(edge.has_status.L).hasId(vertex.profileStatus.prop.id.V.profileStatusPublished)).range(offset, pageNumber * limit)
    .choose(__.hasId(userId)
    ,__.project(
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
      .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
    
  , __.project(
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
    "following"

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
    .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
    .by(__.choose(__.in_(edge.follows.L).hasId(userId),__.constant(true),__.constant(false)))
    ).toList()


    const output = { count: count.value, users: users }


    console.log(output)
    return output



  }

  else{
  const users = await g.V().hasLabel(vertex.user.L).where(__.out(edge.has_status.L).hasId(vertex.profileStatus.prop.id.V.profileStatusPublished)).range(offset, pageNumber * limit)
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
}




export const getUsersListInCompany = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetUsersListInCompanyInput, cognitoUsername: string) => {

  const { pageNumber, pageSize,requestedCompanyId,requesterEntityId } = data

  const errorString1 = `inputs "requestedCompanyId",,"requesterEntityId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = "company not found"
  const errorString4 = `requester entity do not have access to the company's profile`

  if (!pageNumber || !pageSize || !requestedCompanyId || !requesterEntityId ) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, requesterEntityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }

  
  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;


  if (requesterEntityId !== requestedCompanyId) {


    const requesterType = await g.V(requesterEntityId).label().next()
    const checkRequestedCompany = await g.V(requestedCompanyId).hasLabel(vertex.company.L).next()

    

    if (checkRequestedCompany.value == null) {
      throw new Error(errorString3)
    }


    if (requesterType.value === vertex.user.L) {

      const errorHandling1 = await g.V(requesterEntityId).coalesce(__.out(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).hasId(requestedCompanyId)
        , __.choose(__.V(requestedCompanyId).out(edge.has_status.L).values(vertex.profileStatus.prop.name.N).is(neq(vertex.profileStatus.prop.name.V.PUBLISHED)), __.constant(errorString4)
        )).next()

      if (errorHandling1.value == errorString4) {
        throw new Error(errorString4)
      }


    }

    else {

      const errorHandling2 = await g.V(requestedCompanyId)
        .choose(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N).is(neq(vertex.profileStatus.prop.name.V.PUBLISHED)), __.constant(errorString4)).next()

      if (errorHandling2.value == errorString4) {
        throw new Error(errorString4)
      }

    }

  }


    const count = await g.V(requestedCompanyId).in_(edge.OWNER.L, edge.OTHER_EMPLOYEE.L, edge.DEVELOPER.L).count().next()

    let users = await g.V(requestedCompanyId).in_(edge.OWNER.L, edge.OTHER_EMPLOYEE.L, edge.DEVELOPER.L).range(offset, pageNumber * limit)
    .choose(__.hasId(requesterEntityId)
    ,__.project(
      "id",
      "firstName",
      "lastName",
      "city",
      "country",
      "picture_url",
      "role",
      "date_added",
      "total_followers",
      "profileStatus",
    )
    .by(id)
    .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(
      __.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant(""))
    )
    .by(
      __.values(vertex.user.prop.pictureUrl.N)
        .fold()
        .coalesce(__.unfold(), __.constant(""))
    )
    .by(__.outE(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).where(__.inV().hasId(requestedCompanyId)).label())
    .by(__.outE(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).where(__.inV().hasId(requestedCompanyId)).values(edge.OWNER.prop.timeStamp.N).fold().coalesce(__.unfold(), __.constant("")))

    .by(__.inE(edge.follows.L).count())
    .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
    ,__.project(
      "id",
      "firstName",
      "lastName",
      "city",
      "country",
      "picture_url",
      "role",
      "date_added",
      "total_followers",
      "profileStatus",
      'following'
    )
    .by(id)
    .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(__.values(vertex.user.prop.city.N).fold().coalesce(__.unfold(), __.constant("")))
    .by(
      __.values(vertex.user.prop.country.N).fold().coalesce(__.unfold(), __.constant(""))
    )
    .by(
      __.values(vertex.user.prop.pictureUrl.N)
        .fold()
        .coalesce(__.unfold(), __.constant(""))
    )
    .by(__.outE(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).where(__.inV().hasId(requestedCompanyId)).label())
    .by(__.outE(edge.OWNER.L, edge.DEVELOPER.L, edge.OTHER_EMPLOYEE.L).where(__.inV().hasId(requestedCompanyId)).values(edge.OWNER.prop.timeStamp.N).fold().coalesce(__.unfold(), __.constant("")))

    .by(__.inE(edge.follows.L).count())
    .by(__.out(edge.has_status.L).values(vertex.profileStatus.prop.name.N))
    .by(__.choose(__.in_(edge.follows.L).hasId(requesterEntityId),__.constant(true),__.constant(false)))
    )
    .toList()


    
    const output = { count: count.value, users: users }


    console.log(output)
    return output


  }



  

  
export const getRecommendationRequestsByMe = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetRecommendationRequestsByMeInput, cognitoUsername: string) => {

  const { pageNumber, pageSize,userId } = data

  const errorString1 = `inputs "userId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`

  if (!pageNumber || !pageSize || !userId ) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


    
  if (pageNumber < 1) {

    throw new Error(errorString3)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;


  const count = await g.V(userId).outE('requestsRecommendation').count().next()

  const requests= await g.V(userId).outE('requestsRecommendation').range(offset, pageNumber * limit)
  .project("id", "timeStamp","requesterUserId","requestedUserId","message")
  .by(id)
  .by(__.values('timeStamp').fold().coalesce(__.unfold(), __.constant('')))
  .by(__.outV().id())
  .by(__.inV().id())
  .by(__.values('message').fold().coalesce(__.unfold(), __.constant(''))).toList()


  const output = { count: count.value, requests: requests }

  console.log(output)

  return output
 
}



export const getRecommendationRequestsForMe = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetRecommendationRequestsForMeInput, cognitoUsername: string) => {

  const { pageNumber, pageSize,userId } = data

  const errorString1 = `inputs "userId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`

  if (!pageNumber || !pageSize || !userId ) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


    
  if (pageNumber < 1) {

    throw new Error(errorString3)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;


  const count = await g.V(userId).inE('requestsRecommendation').count().next()

  const requests= await g.V(userId).inE('requestsRecommendation').range(offset, pageNumber * limit)
  .project("id", "timeStamp","requesterUserId","requestedUserId","message")
  .by(id)
  .by(__.values('timeStamp').fold().coalesce(__.unfold(), __.constant('')))
  .by(__.outV().id())
  .by(__.inV().id())
  .by(__.values('message').fold().coalesce(__.unfold(), __.constant(''))).toList()


  const output = { count: count.value, requests: requests }

  console.log(output)

  return output
 
}





export const getRecommendationsForMe = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetRecommendationsForMeInput, cognitoUsername: string) => {

  const { pageNumber, pageSize,userId } = data

  const errorString1 = `inputs "userId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`

  if (!pageNumber || !pageSize || !userId ) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


    
  if (pageNumber < 1) {

    throw new Error(errorString3)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;


  const count = await g.V(userId).inE('recommends').count().next()

  const recommendations= await g.V(userId).inE('recommends').range(offset, pageNumber * limit)
  .project("id", "timeStamp","recommendationFor","recommendedBy","text")
  .by(id)
  .by(__.values('timeStamp').fold().coalesce(__.unfold(), __.constant('')))
  .by(__.inV().id())
  .by(__.outV().id())
  .by(__.values('text').fold().coalesce(__.unfold(), __.constant(''))).toList()


  const output = { count: count.value, recommendations: recommendations }

  console.log(output)

  return output
 
}







export const getRecommendationsByMe = async (g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: GetRecommendationRequestsByMeInput, cognitoUsername: string) => {

  const { pageNumber, pageSize,userId } = data

  const errorString1 = `inputs "userId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`

  if (!pageNumber || !pageSize || !userId ) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmUserFromCognito(g, userId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


    
  if (pageNumber < 1) {

    throw new Error(errorString3)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;


  const count = await g.V(userId).outE('recommends').count().next()

  const recommendations= await g.V(userId).outE('recommends').range(offset, pageNumber * limit)
  .project("id", "timeStamp","recommendationFor","recommendedBy","text")
  .by(id)
  .by(__.values('timeStamp').fold().coalesce(__.unfold(), __.constant('')))
  .by(__.inV().id())
  .by(__.outV().id())
  .by(__.values('text').fold().coalesce(__.unfold(), __.constant(''))).toList()


  const output = { count: count.value, recommendations: recommendations }

  console.log(output)

  return output
 
}






