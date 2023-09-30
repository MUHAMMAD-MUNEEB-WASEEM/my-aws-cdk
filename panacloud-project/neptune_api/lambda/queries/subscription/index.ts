import * as gremlin from 'gremlin';
import {FetchMyApiTestingSubscriptionInput,FetchMyApiSubscriptionInput} from '../../graphqlSchemaTypes';

import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;
const identityVerifier = require('/opt/cognitoAuthentication')


const { edge, vertex } = hackolade_graphdb

const __ = gremlin.process.statics
const id = gremlin.process.t.id



export async function fetchMyApiTestingSubscriptions(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchMyApiTestingSubscriptionInput, cognitoUsername: string) {

  const { entityId, apiId ,pageNumber,pageSize} = data

  const errorString1 = `inputs "entityId", "apiId", "pageNumber" and "pageSize" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = 'the entity doesnt own this api'
  const errorString4 = 'api not found'
  const errorString5 = `the page number starts from 1`


  if (!entityId || !pageSize ||! pageNumber || !apiId) {
    throw new Error(errorString1)
  }


  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }

  
  if (pageNumber < 1) {

    throw new Error(errorString5)

}



  const errorCheck = await g.V(apiId).hasLabel(vertex.openApi.L, vertex.graphQlApi.L)
    .fold()
    .coalesce(__.unfold()
      .coalesce(__.in_(edge.creates.L).hasId(entityId)
        , __.constant(errorString3))
      , __.constant(errorString4)).next()

  if (errorCheck.value === errorString3) {
    throw new Error(errorString3)

  }

  if (errorCheck.value === errorString4) {
    throw new Error(errorString4)

  }

  
  const limit = pageSize;
  const offset = (pageNumber - 1) * limit;


  const result = await g.V(apiId).in_(edge.subscription_for.L).where(__.out(edge.has_type.L).has(id, vertex.subscriptionType.prop.id.V.subscriptionType_testing)).range(offset, pageNumber * limit)
    //const result = await g.V(entityId).out(edge.subscribes.L).where(__.out(edge.for.L).hasId(apiId))
    .project(
      "subscriptionId",
      "subscriptionCreationDate",
      "paymentDayEveryMonth",
      "api",
      "subscription_token",
      "status",
      'type'
    )
    .by(id)
    .by(__.inE(edge.subscribes.L).values(edge.subscribes.prop.timeStamp.N))
    .by(
      __.values(vertex.subscription.prop.paymentDayEveryMonth.N)
        .fold()
        .coalesce(__.unfold(), __.constant(""))
    )
    .by(
      __.V(apiId).project('id', 'title', 'imageUrl')
        .by(id)
        .by(__.values(vertex.graphQlApi.prop.title.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.graphQlApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant("")))

    )
    .by(
      __.values(vertex.subscription.prop.subscriptionToken.N)
        .fold()
        .coalesce(__.unfold(), __.constant(""))
    )
    .by(__.out(edge.has_status.L).values(vertex.subscriptionStatus.prop.name.N))
    .by(__.out(edge.has_type.L).values(vertex.subscriptionType.prop.name.N))
    .toList()





  console.log(result)



  return result


}



export async function fetchMyApiSubscription(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: FetchMyApiSubscriptionInput, cognitoUsername: string) {
  const { entityId, apiId } = data


  const errorString1 = `inputs "entityId" and "apiId" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = 'api not found'
  const errorString4 = 'the entity has not subscribed to this api'
  const errorString5 = 'the entity owns this api. To see your test subscriptions please run fetchMyApiTestingSubscriptions query'



  if (!entityId || !apiId) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


  const errorCheck = await g.V(apiId).hasLabel(vertex.openApi.L, vertex.graphQlApi.L)
    .fold().coalesce(__.unfold().coalesce(__.in_(edge.subscription_for.L).where(__.in_(edge.subscribes.L).hasId(entityId))
      .choose(__.out(edge.has_type.L).hasId(vertex.subscriptionType.prop.id.V.subscriptionType_testing)
        , __.constant(errorString5))
      , __.constant(errorString4))
      , __.constant(errorString3)).next()




  if (errorCheck.value === errorString3) {
    throw new Error(errorString3)

  }

  if (errorCheck.value === errorString4) {
    throw new Error(errorString4)

  }

  if (errorCheck.value === errorString5) {
    throw new Error(errorString5)

  }

  const result = await g.V(entityId).out(edge.subscribes.L).where(__.out(edge.subscription_for.L).hasId(apiId))
    .project(
      "subscriptionId",
      "subscriptionCreationDate",
      "paymentDayEveryMonth",
      "api",
      "subscription_token",
      "status",
      'type'
    )
    .by(id)
    .by(__.inE(edge.subscribes.L).values(edge.subscribes.prop.timeStamp.N))
    .by(
      __.values(vertex.subscription.prop.paymentDayEveryMonth.N)
        .fold()
        .coalesce(__.unfold(), __.constant(""))
    )
    .by(
      __.V(apiId).project('id', 'title', 'imageUrl')
        .by(id)
        .by(__.values(vertex.graphQlApi.prop.title.N).fold().coalesce(__.unfold(), __.constant("")))
        .by(__.values(vertex.graphQlApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant("")))

    )
    .by(
      __.values(vertex.subscription.prop.subscriptionToken.N)
        .fold()
        .coalesce(__.unfold(), __.constant(""))
    )
    .by(__.out(edge.has_status.L).values(vertex.subscriptionStatus.prop.name.N))
    .by(__.out(edge.has_type.L).values(vertex.subscriptionType.prop.name.N))
    .next()


  console.log(result)
  return result.value
}
