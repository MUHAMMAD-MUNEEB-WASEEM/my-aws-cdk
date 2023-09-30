import * as gremlin from 'gremlin';

// import { FetchMyApiTokenInput, FetchMySubscribedApisInput, FetchallPublicApisInput, ApiKind, FetchApiInfoInput, ApiFullInfo } from '../../../lambda-layer/graphqlSchemaTypes';
 
import {FetchAllPublicApisInput,FetchMyPrivateApisInput,FetchMyUnderDevelopmentApisInput,FetchMyPublicApisInput,ApiKind,FetchMySubscribedApisInput, FetchMyApiTokenInput,FetchApiInfoInput, FetchApiReviewsInput} from '../../graphqlSchemaTypes';

import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;
const identityVerifier = require('/opt/cognitoAuthentication')

const { edge, vertex } = hackolade_graphdb
const { t, P } = gremlin.process;

const __ = gremlin.process.statics
const id = gremlin.process.t.id
const neq = gremlin.process.P.neq
const within = gremlin.process.P.within


export async function fetchMyPublicApis(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchMyPublicApisInput, cognitoUsername: string) {


  const { entityId, pageSize, pageNumber } = data;



  
  const errorString1 = `inputs "entityId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`



  if (!entityId || !pageSize ||! pageNumber) {
    throw new Error(errorString1)
  }



  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


  if (pageNumber < 1) {

    throw new Error(errorString3)

  }



  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;

  const count = await g.V(entityId).out(edge.creates.L).filter(__.out(edge.has_status.L).has(vertex.apiStatus.prop.name.N, vertex.apiStatus.prop.name.V.PUBLIC)).count().next()


  const apis = await g.V(entityId).out(edge.creates.L).filter(__.out(edge.has_status.L).has(vertex.apiStatus.prop.name.N, vertex.apiStatus.prop.name.V.PUBLIC)).range(offset, pageNumber * limit)
    .project('apiId', 'title', 'shortDescription', "imageUrl", "apiType", "owner", 'status', 'numOfSubscribers', 'apiKind')
    .by(id)
    .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(
      __.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  )
    )
    .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
    .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
    .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
    .toList()

  console.log(apis)

  const output = { count: count.value, apis: apis }


  return output


}












export async function fetchMyPrivateApis(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchMyPrivateApisInput, cognitoUsername: string) {



  const { entityId, pageSize, pageNumber } = data;

  const errorString1 = `inputs "entityId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`



  if (!entityId || !pageSize ||! pageNumber) {
    throw new Error(errorString1)
  }


  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


  if (pageNumber < 1) {

    throw new Error(errorString3)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;

  const count = await g.V(entityId).out(edge.creates.L).filter(__.out(edge.has_status.L).has(vertex.apiStatus.prop.name.N, vertex.apiStatus.prop.name.V.PRIVATE)).count().next()


  const apis = await g.V(entityId).out(edge.creates.L).filter(__.out(edge.has_status.L).has(vertex.apiStatus.prop.name.N, vertex.apiStatus.prop.name.V.PRIVATE)).range(offset, pageNumber * limit)
    .project('apiId', 'title', 'shortDescription', "imageUrl", "apiType", "owner", 'status', 'numOfSubscribers', 'apiKind')
    .by(id)
    .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(
      __.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  )
    )
    .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
    .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
    .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
    .toList()

  console.log(apis)

  const output = { count: count.value, apis: apis }


  return output


}






export async function fetchMyUnderDevelopmentApis(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchMyUnderDevelopmentApisInput, cognitoUsername: string) {


  const { entityId, pageSize, pageNumber } = data;


  const errorString1 = `inputs "entityId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`



  if (!entityId || !pageSize ||! pageNumber) {
    throw new Error(errorString1)
  }


  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


  if (pageNumber < 1) {

    throw new Error(errorString3)

  }



  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;

  const count = await g.V(entityId).out(edge.creates.L).filter(__.out(edge.has_status.L).has(vertex.apiStatus.prop.name.N, vertex.apiStatus.prop.name.V.UNDERDEVELOPMENT)).count().next()


  const apis = await g.V(entityId).out(edge.creates.L).filter(__.out(edge.has_status.L).has(vertex.apiStatus.prop.name.N, vertex.apiStatus.prop.name.V.UNDERDEVELOPMENT)).range(offset, pageNumber * limit)
    .project('apiId', 'title', 'shortDescription', "imageUrl", "apiType", "owner", 'status', 'numOfSubscribers', 'apiKind')
    .by(id)
    .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(
      __.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  )
    )
    .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
    .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
    .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
    .toList()

  console.log(apis)

  const output = { count: count.value, apis: apis }


  return output

}


export async function fetchMySubscribedApis(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchMySubscribedApisInput, cognitoUsername: string) {
  const { entityId, pageSize, pageNumber } = data;

  const errorString1 = `inputs "entityId", "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `the page number starts from 1`



  if (!entityId || !pageSize ||! pageNumber) {
    throw new Error(errorString1)
  }


  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


  if (pageNumber < 1) {

    throw new Error(errorString3)

  }


  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;

  const count = await g.V(entityId)
    .out(edge.subscribes.L).where(__.out(edge.subscription_for.L).in_(edge.creates.L).hasId(neq(entityId)))
    .out(edge.subscription_for.L).count().next()



  const apis = await g.V(entityId)
    .out(edge.subscribes.L).where(__.out(edge.subscription_for.L).in_(edge.creates.L).hasId(neq(entityId)))
    .out(edge.subscription_for.L).range(offset, pageNumber * limit)
    .project('apiId', 'title', 'shortDescription', "imageUrl", "apiType", "owner", 'status', 'numOfSubscribers', 'apiKind')
    .by(id)
    .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(
      __.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  )
    )
    .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
    .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
    .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
    .toList()

  console.log(apis);

  const output = { count: count.value, apis: apis }

  return output;
}


export async function fetchAllPublicApis(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchAllPublicApisInput , cognitoUsername: string | undefined | null) {

  let { pageSize, pageNumber,apiType,entityId } = data;

  const errorString1 = `inputs "pageSize" and "pageNumber" cannot be empty strings`
  const errorString2 = `the page number starts from 1`
  const errorString3 = "an invalid error occured"
  const errorString4 = "please enter the entityId"
  const errorString5 = "you are not logged in"

  
  if (!cognitoUsername && entityId){
    throw new Error(errorString5)

  }

  if (cognitoUsername && !entityId){
    throw new Error(errorString4)

  }

  if (cognitoUsername && entityId){
    
    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


    if (!confirmEntity) {
  
      throw new Error(errorString3)
  
    }
  }

  if (!pageSize ||! pageNumber) {
    throw new Error(errorString1)
  }

  if (pageNumber < 1) {
    throw new Error(errorString2)

  }

  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;

  let getPublicApisCount;
  let getPublicApis;


    if ( (!apiType) || (apiType && apiType.length === 0)){

      getPublicApisCount =  g.V(vertex.apiStatus.prop.id.V.apiStatusPublic)
      .in_(edge.has_status.L).count()

      getPublicApis =  g.V(vertex.apiStatus.prop.id.V.apiStatusPublic)
      .in_(edge.has_status.L)
    }

    else{

      apiType = apiType.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })

    console.log(apiType)

      let filteredApiTypeVerticesIds:string[] = [] 

      for (let type of apiType){
      
      switch (type) {

        case vertex.apiType.prop.name.V.CRM:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_CRM)
            break;
        case vertex.apiType.prop.name.V.ERP:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_ERP)
            break;

        case vertex.apiType.prop.name.V.ACCOUNTING:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_ACCOUNTING)
            break;

        case vertex.apiType.prop.name.V.PM:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_PM)
            break;


        case vertex.apiType.prop.name.V.CMS:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_CMS)
            break;

        case vertex.apiType.prop.name.V.COMMUNICATION:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_COMMUNICATION)
            break;

        case vertex.apiType.prop.name.V.ECOMMERCE:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_ECOMMERCE)
            break;

        case vertex.apiType.prop.name.V.HRM:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_HRM)
            break;

        case vertex.apiType.prop.name.V.PAYMENT_GATEWAY:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_PAYMENT_GATEWAY)
            break;


        case vertex.apiType.prop.name.V.BILLING:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_BILLING)
            break;


        case vertex.apiType.prop.name.V.FINANCE:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_FINANCE)
            break;


        case vertex.apiType.prop.name.V.EDUCATION:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_EDUCATION)
            break;
        case vertex.apiType.prop.name.V.MEDICAL:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_MEDICAL)
            break;
        case vertex.apiType.prop.name.V.MUSIC:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_MUSIC)
            break;


        case vertex.apiType.prop.name.V.NEWS:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_NEWS)
            break;

        case vertex.apiType.prop.name.V.SOCIAL_NETWORKING:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_SOCIAL_NETWORKING)
            break;
        case vertex.apiType.prop.name.V.WEATHER:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_WEATHER)
            break;


        case vertex.apiType.prop.name.V.LIFESTYLE:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_LIFESTYLE)
            break;
        case vertex.apiType.prop.name.V.PRODUCTIVITY:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_PRODUCTIVITY)
            break;
        case vertex.apiType.prop.name.V.SPORTS:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_SPORTS)
            break;


        case vertex.apiType.prop.name.V.TRAVEL:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_TRAVEL)
            break;

        case vertex.apiType.prop.name.V.FOOD:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_FOOD)
            break;

        case vertex.apiType.prop.name.V.PHOTO_VIDEO:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_PHOTO_VIDEO)
            break;


        case vertex.apiType.prop.name.V.UTILITIES:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_UTILITIES)
            break;


        case vertex.apiType.prop.name.V.DATA:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_DATA)
            break;


        case vertex.apiType.prop.name.V.AI:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_AI)
            break;




        case vertex.apiType.prop.name.V.IOT:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_IOT)
            break;


        case vertex.apiType.prop.name.V.BLOCKCHAIN_CRYPTO:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_BLOCKCHAIN_CRYPTO)
            break;


        case vertex.apiType.prop.name.V.BUSINESS:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_BUSINESS)
            break;

        case vertex.apiType.prop.name.V.REFERENCE:
          filteredApiTypeVerticesIds.push( vertex.apiType.prop.id.V.apiType_REFERENCE)
            break;

        case vertex.apiType.prop.name.V.HEALTH_FITNESS:
          filteredApiTypeVerticesIds.push(vertex.apiType.prop.id.V.apiType_HEALTH_FITNESS)
            break;

    }

  }
    
  console.log(filteredApiTypeVerticesIds)

      getPublicApisCount =  g.V(vertex.apiStatus.prop.id.V.apiStatusPublic)
      .in_(edge.has_status.L).where(__.out(edge.has_type.L).has(id,within(...filteredApiTypeVerticesIds))).count()
      
      getPublicApis =  g.V(vertex.apiStatus.prop.id.V.apiStatusPublic)
      .in_(edge.has_status.L).where(__.out(edge.has_type.L).has(id,within(...filteredApiTypeVerticesIds)))
    }

  
  const count = await getPublicApisCount.next()

  if (cognitoUsername){

    const apis = await getPublicApis.range(offset, pageNumber * limit).choose(__.in_(edge.creates.L).hasId(entityId)
    ,__.project('apiId', 'title', 'shortDescription', "imageUrl", "apiType", "owner", 'status', 'numOfSubscribers', 'apiKind')
    .by(id)
    .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(
      __.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  ) 
    )
    .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
    .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
    .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
     
    ,__.project('apiId', 'title', 'shortDescription', "imageUrl", "apiType", "owner", 'status', 'numOfSubscribers', 'apiKind','subscribed')
    .by(id)
    .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(
      __.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  ) 
    )
    .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
    .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
    .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
    .by(__.choose(__.in_(edge.subscription_for.L).in_(edge.subscribes.L).hasId(entityId),__.constant(true),__.constant(false))
    )

    ).toList()

   // console.log(apis)

  const output = { count: count.value, apis: apis }

console.log(output);
  return output;


  }

  else{

  const apis = await getPublicApis.range(offset, pageNumber * limit).as('api')
    .project('apiId', 'title', 'shortDescription', "imageUrl", "apiType", "owner", 'status', 'numOfSubscribers', 'apiKind')
    .by(id)
    .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(
      __.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  ) 
    )
    .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
    .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
    .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
    .toList()

   // console.log(apis)

  const output = { count: count.value, apis: apis }

console.log(output);
  return output;

}
}

export async function fetchMyApiToken(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchMyApiTokenInput, cognitoUsername: string) {
  const { apiId, entityId } = data;

   const errorString1 = `inputs "entityId" and "apiId" cannot be empty strings`
   const errorString2 = "an invalid error occured"
  const errorString3 = 'either the api doesnt exist or the entity doesnt own it';



  if (!entityId || !apiId) {
    throw new Error(errorString1)
  }


  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


  const errorHandling = await g.V(entityId).coalesce(__.out(edge.creates.L).hasId(apiId), __.constant(errorString3)).next()

  if (errorHandling.value === errorString3) {
    throw new Error(errorString3)
  }

  

  const result = await g.V(apiId).project("api_token", "apiId", "entityId")
    .by(__.values(vertex.openApi.prop.apiToken.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(id)
    .by(__.in_(edge.creates.L).id())
    .next()


  console.log("Response ==>", result.value);



  return result.value
}





export async function fetchApiInfo(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchApiInfoInput, cognitoUsername: string) {

  const { apiId, entityId } = data;

  
const errorString1 = `inputs "entityId" and "apiId" cannot be empty strings`
const errorString2 = "an invalid error occured"
const errorString3 = 'api not found'
const errorString4 = 'the entity is not permitted to view the api info'
const errorString5 = "please enter the EntityId"
const errorString6 = "you are not logged in"


if (!cognitoUsername && entityId){
  throw new Error(errorString6)

}

if (cognitoUsername && !entityId){
  throw new Error(errorString5)

}

 if (!apiId) {
   throw new Error(errorString1)
 }


 if (cognitoUsername && entityId){

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }

}


if (cognitoUsername){

  const errorHandling = await g.V(apiId).hasLabel(vertex.graphQlApi.L, vertex.openApi.L).fold().coalesce(__.unfold()
    .choose(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N).is(neq(vertex.apiStatus.prop.name.V.PUBLIC))
      , __.choose(__.in_(edge.creates.L).id().is(neq(entityId)), __.constant(errorString4)))
    , __.constant(errorString3))
    .next()

  


  if (errorHandling.value === errorString3) {
    throw new Error(errorString3)
  }

  if (errorHandling.value === errorString4) {
    throw new Error(errorString4)
  }

}

  else{
    const errorHandling = await g.V(apiId).hasLabel(vertex.graphQlApi.L, vertex.openApi.L).next()
    if (errorHandling.value === null) {
      throw new Error(errorString3)
    }
  }



  if (cognitoUsername){
    
    const result = await g.V(apiId)
      .choose(__.in_(edge.creates.L).hasId(entityId),
      __.choose(
      __.hasLabel(vertex.graphQlApi.L),
  
      __.project('__typename', 'apiId', 'shortDescription', 'longDescription', 'owner', 'apiType', 'title',
        'imageUrl', 'status', 'apiUrl', 'graphQlSchema', 'numOfSubscribers', 'creationDate', 'apiKind')
        .by(__.constant('graphQlApiFullInfo'))
        .by(__.id())
        .by(__.values(vertex.graphQlApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.graphQlApi.prop.longDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.in_(edge.creates.L)
        .choose(__.hasLabel(vertex.user.L)
  
        , __.project("__typename", "id", "firstName", "lastName", "picture_url")
            .by(__.constant('userIdentifier'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
  
        , __.project("__typename", "id", "name", "picture_url")
            .by(__.constant('companyIdentifier'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
  
    )
        
        )
        .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
        .by(__.values(vertex.graphQlApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.graphQlApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
        .by(__.values(vertex.graphQlApi.prop.apiUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.graphQlApi.prop.graphQlSchema.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
        .by(__.inE(edge.creates.L).values(edge.creates.prop.timeStamp.N))
        .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
      
  
  
      , __.project('__typename', 'apiId', 'shortdescription', 'longDescription', 'owner', 'apiType', 'title',
        'imageUrl', 'status', 'apiRootUrl', 'openApiDef', 'numOfSubscribers', 'creationDate', 'apiKind')
        .by(__.constant('openApiFullInfo'))
        .by(__.id())
        .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.in_(edge.creates.L)
        .choose(__.hasLabel(vertex.user.L)
  
        , __.project("__typename", "id", "firstName", "lastName", "picture_url")
            .by(__.constant('userIdentifier'))
            .by(id)
            .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
  
        , __.project("__typename", "id", "name", "picture_url")
            .by(__.constant('companyIdentifier'))
            .by(id)
            .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
            .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
  
    )
        )
        .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
        .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
        .by(__.values(vertex.openApi.prop.apiRootUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.openApi.prop.openApiDef.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
        .by(__.inE(edge.creates.L).values(edge.creates.prop.timeStamp.N))
        .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
       
    )
  
  ,__.choose(
    __.hasLabel(vertex.graphQlApi.L),

    __.project('__typename', 'apiId', 'shortDescription', 'longDescription', 'owner', 'apiType', 'title',
      'imageUrl', 'status', 'apiUrl', 'graphQlSchema', 'numOfSubscribers', 'creationDate', 'apiKind', 'subscribed')
      .by(__.constant('graphQlApiFullInfo'))
      .by(__.id())
      .by(__.values(vertex.graphQlApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.graphQlApi.prop.longDescription.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  )
      
      )
      .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
      .by(__.values(vertex.graphQlApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.graphQlApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
      .by(__.values(vertex.graphQlApi.prop.apiUrl.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.graphQlApi.prop.graphQlSchema.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
      .by(__.inE(edge.creates.L).values(edge.creates.prop.timeStamp.N))
      .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
      .by(__.choose(__.V(entityId).out(edge.subscribes.L).out(edge.subscription_for.L).hasId(apiId),__.constant(true),__.constant(false))
      )


    , __.project('__typename', 'apiId', 'shortdescription', 'longDescription', 'owner', 'apiType', 'title',
      'imageUrl', 'status', 'apiRootUrl', 'openApiDef', 'numOfSubscribers', 'creationDate', 'apiKind','subscribed')
      .by(__.constant('openApiFullInfo'))
      .by(__.id())
      .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  )
      )
      .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
      .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
      .by(__.values(vertex.openApi.prop.apiRootUrl.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.openApi.prop.openApiDef.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
      .by(__.inE(edge.creates.L).values(edge.creates.prop.timeStamp.N))
      .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
      .by(__.choose(__.V(entityId).out(edge.subscribes.L).out(edge.subscription_for.L).hasId(apiId),__.constant(true),__.constant(false))
      )
  )

  ).next()


  console.log(result.value)

  return result.value
  }


  else{

  const result = await g.V(apiId).choose(

    __.hasLabel(vertex.graphQlApi.L),

    __.project('__typename', 'apiId', 'shortDescription', 'longDescription', 'owner', 'apiType', 'title',
      'imageUrl', 'status', 'apiUrl', 'graphQlSchema', 'numOfSubscribers', 'creationDate', 'apiKind')
      .by(__.constant('graphQlApiFullInfo'))
      .by(__.id())
      .by(__.values(vertex.graphQlApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.graphQlApi.prop.longDescription.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  )
      
      )
      .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
      .by(__.values(vertex.graphQlApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.graphQlApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
      .by(__.values(vertex.graphQlApi.prop.apiUrl.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.graphQlApi.prop.graphQlSchema.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
      .by(__.inE(edge.creates.L).values(edge.creates.prop.timeStamp.N))
      .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
    

    , __.project('__typename', 'apiId', 'shortdescription', 'longDescription', 'owner', 'apiType', 'title',
      'imageUrl', 'status', 'apiRootUrl', 'openApiDef', 'numOfSubscribers', 'creationDate', 'apiKind')
      .by(__.constant('openApiFullInfo'))
      .by(__.id())
      .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.in_(edge.creates.L)
      .choose(__.hasLabel(vertex.user.L)

      , __.project("__typename", "id", "firstName", "lastName", "picture_url")
          .by(__.constant('userIdentifier'))
          .by(id)
          .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

      , __.project("__typename", "id", "name", "picture_url")
          .by(__.constant('companyIdentifier'))
          .by(id)
          .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
          .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  )
      )
      .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
      .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
      .by(__.values(vertex.openApi.prop.apiRootUrl.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.values(vertex.openApi.prop.openApiDef.N).fold().coalesce(__.unfold(), __.constant('')))
      .by(__.in_(edge.subscription_for.L).hasLabel(vertex.subscription.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
      .by(__.inE(edge.creates.L).values(edge.creates.prop.timeStamp.N))
      .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
    
  ).next()



  console.log(result.value)

  return result.value

}


}



export async function getPublicApisCountByType(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>){

  const allTypeNames =  Object.keys(vertex.apiType.prop.name.V)


  const output = await g.V().hasLabel(vertex.graphQlApi.L,vertex.openApi.L).where(__.out(edge.has_status.L).hasId(vertex.apiStatus.prop.id.V.apiStatusPublic)).out(edge.has_type.L).dedup().project('type','count')
  .by(__.values(vertex.apiType.prop.name.N))
  .by(__.in_(edge.has_type.L).where(__.out(edge.has_status.L).hasId(vertex.apiStatus.prop.id.V.apiStatusPublic)).count()).toList()


  console.log(output)

  const typesReturned = output.map((val:any)=> val.type)

  console.log(typesReturned)
  let remainingTypes = allTypeNames.filter(function(obj) { return typesReturned.indexOf(obj) == -1; });

  let remainingOutput = remainingTypes.map((val)=> {return ({"count": 0 , "type": val})})

  console.log(remainingOutput)

  let finalOutput = output.concat(remainingOutput)

  console.log(finalOutput)

  return finalOutput

}





export async function fetchApiReviews(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchApiReviewsInput, cognitoUsername: string) {

  const { apiId, entityId,pageNumber,pageSize } = data;

  
const errorString1 = `inputs "entityId", "pageNumber", "pageSize" and "apiId" cannot be empty strings`
const errorString2 = "an invalid error occured"
const errorString3 = `the page number starts from 1`
const errorString4 = `api not found`


 if (!entityId || !apiId || !pageNumber || !pageSize) {
   throw new Error(errorString1)
 }

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }

  if (pageNumber < 1) {
    throw new Error(errorString3)

  }


  const errorHandling = await g.V(apiId).hasLabel(vertex.graphQlApi.L,vertex.openApi.L).next()

  if (errorHandling.value === null){
    throw new Error(errorString4)

  }




  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;



  const count = await g.V(apiId).in_(edge.review_for.L).count().next()

  const reviews = await g.V(apiId).in_(edge.review_for.L).range(offset, pageNumber * limit)
  .project('reviewId','by','apiId','title','text','stars','dateCreated')
  .by(id)
  .by(__.out(edge.reviewed_by.L)
  .choose(__.hasLabel(vertex.user.L)

  , __.project("__typename", "id", "firstName", "lastName", "picture_url")
      .by(__.constant('userIdentifier'))
      .by(id)
      .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

  , __.project("__typename", "id", "name", "picture_url")
      .by(__.constant('companyIdentifier'))
      .by(id)
      .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant("")))
      .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))

)
  
  )
.by(__.out(edge.review_for.L).id())
.by(__.values(vertex.apiReview.prop.title.N).fold().coalesce(__.unfold(), __.constant("")))
.by(__.values(vertex.apiReview.prop.text.N).fold().coalesce(__.unfold(), __.constant("")))
.by(__.values(vertex.apiReview.prop.stars.N).fold().coalesce(__.unfold(), __.constant("")))
.by(__.outE(edge.reviewed_by.L).values(edge.reviewed_by.prop.timeStamp.N)).toList()


console.log(reviews)

const output = { count: count.value, reviews: reviews }

return output

}