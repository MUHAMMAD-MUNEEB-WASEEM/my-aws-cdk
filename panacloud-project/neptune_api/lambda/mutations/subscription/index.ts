
import * as gremlin from "gremlin";
import { v4 as uuidv4, v4 } from "uuid";
import { sign } from "jsonwebtoken";
const identityVerifier = require('/opt/cognitoAuthentication')
import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;
import { SubscribeToApiInput, SubscriptionType, ChangeSubscriptionStatusInput, CreateNewTestingSubscriptionInput } from '../../graphqlSchemaTypes';


const { edge, vertex } = hackolade_graphdb

const __ = gremlin.process.statics;
const id = gremlin.process.t.id;
const single = gremlin.process.cardinality.single;

export async function subscribeToApi(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: SubscribeToApiInput, cognitoUsername: string) {
  const { apiId, entityId } = data;

  const errorString1 = `inputs "apiId" and "entityId" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = "api doesnt Exist";
  const errorString4 = 'the entity has already subscribed to this api'
  const errorString5 = 'the user owns this api. To create more test subscriptions please use "createTestSubscription"'



  if (!entityId || !apiId) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, true)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }


  const errorHandling = await g.V(apiId).hasLabel(vertex.openApi.L, vertex.graphQlApi.L).fold().coalesce(__.unfold()
    .choose(__.in_(edge.subscription_for.L).in_(edge.subscribes.L).hasId(entityId)
      , __.choose(__.in_(edge.creates.L).hasId(entityId), __.constant(errorString5), __.constant(errorString4)))
    , __.constant(errorString3)).next()



  if (errorHandling.value === errorString3) {
    throw new Error(errorString3);
  }

  if (errorHandling.value === errorString4) {
    throw new Error(errorString4);
  }
  if (errorHandling.value === errorString5) {
    throw new Error(errorString5);
  }


  const timeStamp = Date.now()


  const subscriptionId = v4();
  const subscription_info = {
    tokenType: SubscriptionType.Normal,
    apiId: apiId,
    entityId,
    subscriptionId,
  };
  const api_secret_key: any = await g.V(apiId).values(vertex.graphQlApi.prop.secretText.N).next();

  const subscription_token = sign(subscription_info, api_secret_key.value);
  const subscriptionParams = {
    subsciptionId: subscriptionId,
    token: subscription_token,
    subscriptionCreationDate: timeStamp,
    paymentDayEveryMonth: Math.min(new Date().getDay(), 28),
  };


  const subscription_status = await g.V(vertex.subscriptionStatus.prop.id.V.subscriptionStatusActive).fold().coalesce(__.unfold(),
    g.addV(vertex.subscriptionStatus.L)
      .property(id, vertex.subscriptionStatus.prop.id.V.subscriptionStatusActive)
      .property(vertex.subscriptionStatus.prop.name.N, vertex.subscriptionStatus.prop.name.V.ACTIVE)
  ).next()

  const subscription_type = await g.V(vertex.subscriptionType.prop.id.V.subscriptionType_normal).fold().coalesce(__.unfold(),
    g.addV(vertex.subscriptionType.L)
      .property(id, vertex.subscriptionType.prop.id.V.subscriptionType_normal)
      .property(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)
  ).next()


  console.log(subscription_status)

  const output: any = await g.addV(vertex.subscription.L)
    .property(id, subscriptionId)
    .property(
      vertex.subscription.prop.paymentDayEveryMonth.N,
      subscriptionParams.paymentDayEveryMonth
    )
    .property(vertex.subscription.prop.subscriptionToken.N, subscriptionParams.token)
    .as('sub')
    .addE(edge.subscription_for.L)
    .to(g.V(apiId))
    .outV()
    .addE(edge.subscribes.L)
    .from_(g.V(entityId)).property(edge.subscribes.prop.timeStamp.N, timeStamp)
    .inV()
    .addE(edge.has_status.L).from_('sub').to(subscription_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
    .addE(edge.has_type.L).from_('sub').to(subscription_type.value)
    .select('sub')
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
    .next();


  console.log(output)
  return output.value
}



export async function changeSubscriptionStatus(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: ChangeSubscriptionStatusInput, cognitoUsername: string) {
  const { subscriptionId, entityId, status } = data;



  const errorString1 = `inputs "subscriptionId" and "entityId" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = `this subscription is already ${status}`;
  const errorString4 = 'the subscription doesnt exist'
  const errorString5 = `the entity doesnt have access to this subscription`


  if (!entityId || !subscriptionId) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, true)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }



  const errorHandling = await g.V(subscriptionId).hasLabel(vertex.subscription.L).fold().coalesce(__.unfold().coalesce(__.in_(edge.subscribes.L).hasId(entityId).choose(__.V(subscriptionId).out(edge.has_status.L).has(vertex.subscriptionStatus.prop.name.N, status)
    , __.constant(errorString3))
    , __.constant(errorString5))
    , __.constant(errorString4)).next()

  if (errorHandling.value === errorString3) {
    throw new Error(errorString3);

  }
  if (errorHandling.value === errorString4) {
    throw new Error(errorString4);

  }
  if (errorHandling.value === errorString5) {
    throw new Error(errorString5);

  }


  const timeStamp = Date.now()

  let subscriptionStatusVertexId;
  status === vertex.subscriptionStatus.prop.name.V.ACTIVE ? subscriptionStatusVertexId = vertex.subscriptionStatus.prop.id.V.subscriptionStatusActive : subscriptionStatusVertexId = vertex.subscriptionStatus.prop.id.V.subscriptionStatusInactive


  const subscription_status = await g.V(subscriptionStatusVertexId).fold().coalesce(__.unfold(),
    g.addV(vertex.subscriptionStatus.L)
      .property(id, subscriptionStatusVertexId)
      .property(vertex.subscriptionStatus.prop.name.N, status)
  ).next()


  console.log(subscription_status)



  const result = await g.V(subscriptionId).sideEffect(__.outE(edge.has_status.L).drop()).addE(edge.has_status.L).from_(__.V(subscriptionId)).to(__.V(subscriptionStatusVertexId)).property(edge.has_status.prop.timeStamp.N, timeStamp).V(subscriptionId)
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
      __.out(edge.subscription_for.L).project('id', 'title', 'imageUrl')
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

    .next();

  console.log(result)



  return result.value;


}



export async function createNewTestingSubscription(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: CreateNewTestingSubscriptionInput, cognitoUsername: string) {
  const { apiId, entityId } = data;

  const errorString1 = `inputs "apiId" and "entityId" cannot be empty strings`
  const errorString2 = "an invalid error occured"
  const errorString3 = "either the api doesnt exist or the user doesnt own it"



  if (!entityId || !apiId) {
    throw new Error(errorString1)
  }

  const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, true)


  if (!confirmEntity) {

    throw new Error(errorString2)

  }

  const errorHandling = await g.V(entityId).coalesce(__.out(edge.creates.L).hasId(apiId),__.constant(errorString3)).next()

  if (errorHandling.value === errorString3) {
    throw new Error(errorString3);

  }

  
  const timeStamp = Date.now()


  const subscriptionId = v4();
  const subscription_info = {
    tokenType: SubscriptionType.Testing,
    apiId: apiId,
    entityId,
    subscriptionId,
  };
  const api_secret_key: any = await g.V(apiId).values(vertex.graphQlApi.prop.secretText.N).next();

  const subscription_token = sign(subscription_info, api_secret_key.value);

  const subscriptionParams = {
    subsciptionId: subscriptionId,
    token: subscription_token,
    subscriptionCreationDate: timeStamp,
    paymentDayEveryMonth: Math.min(new Date().getDay(), 28),
  };


  const subscription_status = await g.V(vertex.subscriptionStatus.prop.id.V.subscriptionStatusActive).fold().coalesce(__.unfold(),
    g.addV(vertex.subscriptionStatus.L)
      .property(id, vertex.subscriptionStatus.prop.id.V.subscriptionStatusActive)
      .property(vertex.subscriptionStatus.prop.name.N, vertex.subscriptionStatus.prop.name.V.ACTIVE)
  ).next()

  const subscription_type = await g.V(vertex.subscriptionType.prop.id.V.subscriptionType_testing).fold().coalesce(__.unfold(),
    g.addV(vertex.subscriptionType.L)
      .property(id, vertex.subscriptionType.prop.id.V.subscriptionType_testing)
      .property(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.TESTING)
  ).next()



  const output: any = await g.addV(vertex.subscription.L)
    .property(id, subscriptionId)
    .property(
      vertex.subscription.prop.paymentDayEveryMonth.N,
      subscriptionParams.paymentDayEveryMonth
    )
    .property(vertex.subscription.prop.subscriptionToken.N, subscriptionParams.token)
    .as('sub')
    .addE(edge.subscription_for.L)
    .to(g.V(apiId))
    .outV()
    .addE(edge.subscribes.L)
    .from_(g.V(entityId)).property(edge.subscribes.prop.timeStamp.N, timeStamp)
    .inV()
    .addE(edge.has_status.L).from_('sub').to(subscription_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
    .addE(edge.has_type.L).from_('sub').to(subscription_type.value)
    .select('sub')
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
    .next();


  console.log(output)
  return output.value





  }