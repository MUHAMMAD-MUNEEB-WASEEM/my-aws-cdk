import * as gremlin from 'gremlin';
import { v4 as uuidv4 } from 'uuid';
import { sign } from "jsonwebtoken";
import { CreateOpenApiInput, ApiKind, ChangeApiStatusInput, CreateGraphQlApiInput, SubscriptionType, UpdateOpenApiInput,UpdateGraphQlInput,UpdateApiImageInput, CreateApiReviewInput } from '../../graphqlSchemaTypes';
import * as schema from '../../../lambda-layer/graphdb-elements-name.json';
const hackolade_graphdb = require('/opt/graphdb-elements-name.json') as typeof schema;
const identityVerifier = require('/opt/cognitoAuthentication')

const { edge, vertex } = hackolade_graphdb

const __ = gremlin.process.statics
const id = gremlin.process.t.id
const single = gremlin.process.cardinality.single
const within = gremlin.process.P.within

export async function createOpenApi(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: CreateOpenApiInput, cognitoUsername: string) {

    let { entityId, title, apiType, apiRootUrl, openApiDef, apiId } = data;

    
    const errorString1 = `inputs "apiId", "entityId", "title", "openApiDef" and "apiRootUrl" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = 'this apiId is not available'
    const errorString4 = 'You cannot select more than 3 api types'
    const errorString5 = 'you need to select atleast 1 api type'


    if (!entityId || !title || !apiRootUrl || !openApiDef || !apiId){
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)

    console.log(confirmEntity)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    apiType = apiType.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })


        if (apiType.length > 3) {
            throw new Error(errorString4)
    
        }

        if (apiType.length === 0){
            throw new Error(errorString5)

        }


    const checkApiId = await g.V(apiId).next()

    if (checkApiId.value !== null) {
        throw new Error(errorString3)
    }

    const secretText = uuidv4();
    console.log("secretText", secretText)

    const user_secret_key: any = await g.V(entityId).values(vertex.user.prop.secretText.N).next();

    //const apiId = uuidv4();
    const timeStamp = Date.now()

    const api_info = {
        apiId: apiId,
        entityID: entityId,
        api_kind: ApiKind.Openapi
    }

    const api_token = sign(api_info, user_secret_key.value);

    const subscriptionId1 = uuidv4();
    const subscriptionId2 = uuidv4();
    const subscriptionId3 = uuidv4();

    const subscription_info1 = {
        tokenType: SubscriptionType.Testing,
        apiId: apiId,
        entityID: entityId,
        subscriptionId1,
    };

    const subscription_info2 = {
        tokenType: SubscriptionType.Testing,
        apiId: apiId,
        entityID: entityId,
        subscriptionId2,
    };

    const subscription_info3 = {
        tokenType: SubscriptionType.Testing,
        apiId: apiId,
        entityID: entityId,
        subscriptionId3,
    };
    const subscription_token1 = sign(subscription_info1, secretText);
    const subscription_token2 = sign(subscription_info2, secretText);
    const subscription_token3 = sign(subscription_info3, secretText);



    const subscriptionParams = {
        subscriptionCreationDate: Date.now(),
        paymentDayEveryMonth: Math.min(new Date().getDay(), 28),
    };

    const api_status = await g.V(vertex.apiStatus.prop.id.V.apiStatusUnderdevelopment)
        .fold()
        .coalesce(__.unfold(),
            g.addV(vertex.apiStatus.L)
                .property(id, vertex.apiStatus.prop.id.V.apiStatusUnderdevelopment)
                .property(vertex.apiStatus.prop.name.N, vertex.apiStatus.prop.name.V.UNDERDEVELOPMENT)
        ).next();

    const createOpenApi = g.addV(vertex.openApi.L)
        .property(id, apiId)
        .property(vertex.openApi.prop.title.N, title)
        .property(vertex.openApi.prop.secretText.N, secretText)
        .property(vertex.openApi.prop.apiRootUrl.N, apiRootUrl)
        .property(vertex.openApi.prop.openApiDef.N, openApiDef)
        .property(vertex.openApi.prop.apiToken.N, api_token)
        .as('new_api')
        .addE(edge.has_status.L).from_('new_api').to(api_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .addE(edge.creates.L).from_(__.V(entityId)).to('new_api').property(edge.creates.prop.timeStamp.N, timeStamp)


    let vertexId

    for (let typeName of apiType) {

        switch (typeName) {

            case vertex.apiType.prop.name.V.CRM:
                vertexId = vertex.apiType.prop.id.V.apiType_CRM
                break;
            case vertex.apiType.prop.name.V.ERP:
                vertexId = vertex.apiType.prop.id.V.apiType_ERP
                break;

            case vertex.apiType.prop.name.V.ACCOUNTING:
                vertexId = vertex.apiType.prop.id.V.apiType_ACCOUNTING
                break;

            case vertex.apiType.prop.name.V.PM:
                vertexId = vertex.apiType.prop.id.V.apiType_PM
                break;


            case vertex.apiType.prop.name.V.CMS:
                vertexId = vertex.apiType.prop.id.V.apiType_CMS
                break;

            case vertex.apiType.prop.name.V.COMMUNICATION:
                vertexId = vertex.apiType.prop.id.V.apiType_COMMUNICATION
                break;

            case vertex.apiType.prop.name.V.ECOMMERCE:
                vertexId = vertex.apiType.prop.id.V.apiType_ECOMMERCE
                break;

            case vertex.apiType.prop.name.V.HRM:
                vertexId = vertex.apiType.prop.id.V.apiType_HRM
                break;

            case vertex.apiType.prop.name.V.PAYMENT_GATEWAY:
                vertexId = vertex.apiType.prop.id.V.apiType_PAYMENT_GATEWAY
                break;


            case vertex.apiType.prop.name.V.BILLING:
                vertexId = vertex.apiType.prop.id.V.apiType_BILLING
                break;


            case vertex.apiType.prop.name.V.FINANCE:
                vertexId = vertex.apiType.prop.id.V.apiType_FINANCE
                break;


            case vertex.apiType.prop.name.V.EDUCATION:
                vertexId = vertex.apiType.prop.id.V.apiType_EDUCATION
                break;
            case vertex.apiType.prop.name.V.MEDICAL:
                vertexId = vertex.apiType.prop.id.V.apiType_MEDICAL
                break;
            case vertex.apiType.prop.name.V.MUSIC:
                vertexId = vertex.apiType.prop.id.V.apiType_MUSIC
                break;


            case vertex.apiType.prop.name.V.NEWS:
                vertexId = vertex.apiType.prop.id.V.apiType_NEWS
                break;

            case vertex.apiType.prop.name.V.SOCIAL_NETWORKING:
                vertexId = vertex.apiType.prop.id.V.apiType_SOCIAL_NETWORKING
                break;
            case vertex.apiType.prop.name.V.WEATHER:
                vertexId = vertex.apiType.prop.id.V.apiType_WEATHER
                break;


            case vertex.apiType.prop.name.V.LIFESTYLE:
                vertexId = vertex.apiType.prop.id.V.apiType_LIFESTYLE
                break;
            case vertex.apiType.prop.name.V.PRODUCTIVITY:
                vertexId = vertex.apiType.prop.id.V.apiType_PRODUCTIVITY
                break;
            case vertex.apiType.prop.name.V.SPORTS:
                vertexId = vertex.apiType.prop.id.V.apiType_SPORTS
                break;


            case vertex.apiType.prop.name.V.TRAVEL:
                vertexId = vertex.apiType.prop.id.V.apiType_TRAVEL
                break;

            case vertex.apiType.prop.name.V.FOOD:
                vertexId = vertex.apiType.prop.id.V.apiType_FOOD
                break;

            case vertex.apiType.prop.name.V.PHOTO_VIDEO:
                vertexId = vertex.apiType.prop.id.V.apiType_PHOTO_VIDEO
                break;


            case vertex.apiType.prop.name.V.UTILITIES:
                vertexId = vertex.apiType.prop.id.V.apiType_UTILITIES
                break;


            case vertex.apiType.prop.name.V.DATA:
                vertexId = vertex.apiType.prop.id.V.apiType_DATA
                break;


            case vertex.apiType.prop.name.V.AI:
                vertexId = vertex.apiType.prop.id.V.apiType_AI
                break;




            case vertex.apiType.prop.name.V.IOT:
                vertexId = vertex.apiType.prop.id.V.apiType_IOT
                break;


            case vertex.apiType.prop.name.V.BLOCKCHAIN_CRYPTO:
                vertexId = vertex.apiType.prop.id.V.apiType_BLOCKCHAIN_CRYPTO
                break;


            case vertex.apiType.prop.name.V.BUSINESS:
                vertexId = vertex.apiType.prop.id.V.apiType_BUSINESS
                break;

            case vertex.apiType.prop.name.V.REFERENCE:
                vertexId = vertex.apiType.prop.id.V.apiType_REFERENCE
                break;

            case vertex.apiType.prop.name.V.HEALTH_FITNESS:
                vertexId = vertex.apiType.prop.id.V.apiType_HEALTH_FITNESS
                break;

        }




        const api_type = await g.V(vertexId)
            .fold()
            .coalesce(__.unfold(),
                g.addV(vertex.apiType.L)
                    .property(id, vertexId)
                    .property(vertex.apiType.prop.name.N, typeName)
            ).next();


        createOpenApi.addE(edge.has_type.L).from_('new_api').to(api_type.value)

    }




    const result = await createOpenApi.select('new_api')
        .project('apiId', 'title', "shortDescription", "longDescription", 'apiType', 'apiRootUrl', 'openApiDef')
        .by(id)
        .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.openApi.prop.longDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
        .by(__.values(vertex.openApi.prop.apiRootUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.openApi.prop.openApiDef.N).fold().coalesce(__.unfold(), __.constant('')))

        .next();


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

    const subscription = await g.addV(vertex.subscription.L)
        .property(id, subscriptionId1)
        .property(vertex.subscription.prop.paymentDayEveryMonth.N, subscriptionParams.paymentDayEveryMonth)
        .property(vertex.subscription.prop.subscriptionToken.N, subscription_token1)
        .as('sub')
        .addE(edge.subscription_for.L).from_('sub').to(__.V(apiId))
        .addE(edge.subscribes.L).from_(__.V(entityId)).to('sub').property(edge.subscribes.prop.timeStamp.N, timeStamp)
        .addE(edge.has_status.L).from_('sub').to(subscription_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .addE(edge.has_type.L).from_('sub').to(subscription_type.value)

        .addV(vertex.subscription.L)
        .property(id, subscriptionId2)
        .property(vertex.subscription.prop.paymentDayEveryMonth.N, subscriptionParams.paymentDayEveryMonth)
        .property(vertex.subscription.prop.subscriptionToken.N, subscription_token2)
        .as('sub')
        .addE(edge.subscription_for.L).from_('sub').to(__.V(apiId))
        .addE(edge.subscribes.L).from_(__.V(entityId)).to('sub').property(edge.subscribes.prop.timeStamp.N, timeStamp)
        .addE(edge.has_status.L).from_('sub').to(subscription_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .addE(edge.has_type.L).from_('sub').to(subscription_type.value)

        .addV(vertex.subscription.L)
        .property(id, subscriptionId3)
        .property(vertex.subscription.prop.paymentDayEveryMonth.N, subscriptionParams.paymentDayEveryMonth)
        .property(vertex.subscription.prop.subscriptionToken.N, subscription_token3)
        .as('sub')
        .addE(edge.subscription_for.L).from_('sub').to(__.V(apiId))
        .addE(edge.subscribes.L).from_(__.V(entityId)).to('sub').property(edge.subscribes.prop.timeStamp.N, timeStamp)
        .addE(edge.has_status.L).from_('sub').to(subscription_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .addE(edge.has_type.L).from_('sub').to(subscription_type.value)

        .next();

    console.log("sub", subscription);




    return result.value



}


export async function createGraphQlApi(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: CreateGraphQlApiInput, cognitoUsername: string) {
    let { entityId, title, graphQlSchema, apiUrl, apiId, apiType } = data;
    console.log(data);

    const errorString1 = `inputs "apiId", "entityId", "title", "graphQlSchema" and "apiUrl" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = 'this apiId is not available'
    const errorString4 = 'You cannot select more than 3 api types'
    const errorString5 = 'you need to select atleast 1 api type'


    if (!entityId || !title || !graphQlSchema || !apiUrl || !apiId){
        throw new Error(errorString1)
    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)

    console.log(confirmEntity)


    if (!confirmEntity) {

        throw new Error(errorString2)

    }


    apiType = apiType.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })


        if (apiType.length > 3) {
            throw new Error(errorString4)
    
        }

        if (apiType.length === 0){
            throw new Error(errorString5)

        }


    const checkApiId = await g.V(apiId).next()

    if (checkApiId.value !== null) {
        throw new Error(errorString3)
    }

    const secretText = uuidv4();
    console.log("secretText", secretText)

    const user_secret_key: any = await g.V(entityId).values(vertex.user.prop.secretText.N).next();

    const timeStamp = Date.now()

    const api_info = {
        apiId: apiId,
        entityID: entityId,
        api_kind: ApiKind.Graphql
    }

    const api_token = sign(api_info, user_secret_key.value);

    const subscriptionId1 = uuidv4();
    const subscriptionId2 = uuidv4();
    const subscriptionId3 = uuidv4();

    const subscription_info1 = {
        tokenType: SubscriptionType.Testing,
        apiId: apiId,
        entityID: entityId,
        subscriptionId1,
    };

    const subscription_info2 = {
        tokenType: SubscriptionType.Testing,
        apiId: apiId,
        entityID: entityId,
        subscriptionId2,
    };

    const subscription_info3 = {
        tokenType: SubscriptionType.Testing,
        apiId: apiId,
        entityID: entityId,
        subscriptionId3,
    };
    const subscription_token1 = sign(subscription_info1, secretText);
    const subscription_token2 = sign(subscription_info2, secretText);
    const subscription_token3 = sign(subscription_info3, secretText);



    const subscriptionParams = {
        subscriptionCreationDate: Date.now(),
        paymentDayEveryMonth: Math.min(new Date().getDay(), 28),
    };

    const api_status = await g.V(vertex.apiStatus.prop.id.V.apiStatusUnderdevelopment)
        .fold()
        .coalesce(__.unfold(),
            g.addV(vertex.apiStatus.L)
                .property(id, vertex.apiStatus.prop.id.V.apiStatusUnderdevelopment)
                .property(vertex.apiStatus.prop.name.N, vertex.apiStatus.prop.name.V.UNDERDEVELOPMENT)
        ).next();

    const createGraphQlApi = g.addV(vertex.graphQlApi.L)
        .property(id, apiId)
        .property(vertex.graphQlApi.prop.title.N, title)
        .property(vertex.graphQlApi.prop.secretText.N, secretText)
        .property(vertex.graphQlApi.prop.graphQlSchema.N, graphQlSchema)
        .property(vertex.graphQlApi.prop.apiUrl.N, apiUrl)
        .property(vertex.graphQlApi.prop.apiToken.N, api_token)
        .as('new_api')
        .addE(edge.has_status.L).from_('new_api').to(api_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .addE(edge.creates.L).from_(__.V(entityId)).to('new_api').property(edge.creates.prop.timeStamp.N, timeStamp)



    let vertexId

    for (let typeName of apiType) {

        switch (typeName) {

            case vertex.apiType.prop.name.V.CRM:
                vertexId = vertex.apiType.prop.id.V.apiType_CRM
                break;
            case vertex.apiType.prop.name.V.ERP:
                vertexId = vertex.apiType.prop.id.V.apiType_ERP
                break;

            case vertex.apiType.prop.name.V.ACCOUNTING:
                vertexId = vertex.apiType.prop.id.V.apiType_ACCOUNTING
                break;

            case vertex.apiType.prop.name.V.PM:
                vertexId = vertex.apiType.prop.id.V.apiType_PM
                break;


            case vertex.apiType.prop.name.V.CMS:
                vertexId = vertex.apiType.prop.id.V.apiType_CMS
                break;

            case vertex.apiType.prop.name.V.COMMUNICATION:
                vertexId = vertex.apiType.prop.id.V.apiType_COMMUNICATION
                break;

            case vertex.apiType.prop.name.V.ECOMMERCE:
                vertexId = vertex.apiType.prop.id.V.apiType_ECOMMERCE
                break;

            case vertex.apiType.prop.name.V.HRM:
                vertexId = vertex.apiType.prop.id.V.apiType_HRM
                break;

            case vertex.apiType.prop.name.V.PAYMENT_GATEWAY:
                vertexId = vertex.apiType.prop.id.V.apiType_PAYMENT_GATEWAY
                break;


            case vertex.apiType.prop.name.V.BILLING:
                vertexId = vertex.apiType.prop.id.V.apiType_BILLING
                break;


            case vertex.apiType.prop.name.V.FINANCE:
                vertexId = vertex.apiType.prop.id.V.apiType_FINANCE
                break;


            case vertex.apiType.prop.name.V.EDUCATION:
                vertexId = vertex.apiType.prop.id.V.apiType_EDUCATION
                break;
            case vertex.apiType.prop.name.V.MEDICAL:
                vertexId = vertex.apiType.prop.id.V.apiType_MEDICAL
                break;
            case vertex.apiType.prop.name.V.MUSIC:
                vertexId = vertex.apiType.prop.id.V.apiType_MUSIC
                break;


            case vertex.apiType.prop.name.V.NEWS:
                vertexId = vertex.apiType.prop.id.V.apiType_NEWS
                break;

            case vertex.apiType.prop.name.V.SOCIAL_NETWORKING:
                vertexId = vertex.apiType.prop.id.V.apiType_SOCIAL_NETWORKING
                break;
            case vertex.apiType.prop.name.V.WEATHER:
                vertexId = vertex.apiType.prop.id.V.apiType_WEATHER
                break;


            case vertex.apiType.prop.name.V.LIFESTYLE:
                vertexId = vertex.apiType.prop.id.V.apiType_LIFESTYLE
                break;
            case vertex.apiType.prop.name.V.PRODUCTIVITY:
                vertexId = vertex.apiType.prop.id.V.apiType_PRODUCTIVITY
                break;
            case vertex.apiType.prop.name.V.SPORTS:
                vertexId = vertex.apiType.prop.id.V.apiType_SPORTS
                break;


            case vertex.apiType.prop.name.V.TRAVEL:
                vertexId = vertex.apiType.prop.id.V.apiType_TRAVEL
                break;

            case vertex.apiType.prop.name.V.FOOD:
                vertexId = vertex.apiType.prop.id.V.apiType_FOOD
                break;

            case vertex.apiType.prop.name.V.PHOTO_VIDEO:
                vertexId = vertex.apiType.prop.id.V.apiType_PHOTO_VIDEO
                break;


            case vertex.apiType.prop.name.V.UTILITIES:
                vertexId = vertex.apiType.prop.id.V.apiType_UTILITIES
                break;


            case vertex.apiType.prop.name.V.DATA:
                vertexId = vertex.apiType.prop.id.V.apiType_DATA
                break;


            case vertex.apiType.prop.name.V.AI:
                vertexId = vertex.apiType.prop.id.V.apiType_AI
                break;




            case vertex.apiType.prop.name.V.IOT:
                vertexId = vertex.apiType.prop.id.V.apiType_IOT
                break;


            case vertex.apiType.prop.name.V.BLOCKCHAIN_CRYPTO:
                vertexId = vertex.apiType.prop.id.V.apiType_BLOCKCHAIN_CRYPTO
                break;


            case vertex.apiType.prop.name.V.BUSINESS:
                vertexId = vertex.apiType.prop.id.V.apiType_BUSINESS
                break;

            case vertex.apiType.prop.name.V.REFERENCE:
                vertexId = vertex.apiType.prop.id.V.apiType_REFERENCE
                break;

            case vertex.apiType.prop.name.V.HEALTH_FITNESS:
                vertexId = vertex.apiType.prop.id.V.apiType_HEALTH_FITNESS
                break;

        }




        const api_type = await g.V(vertexId)
            .fold()
            .coalesce(__.unfold(),
                g.addV(vertex.apiType.L)
                    .property(id, vertexId)
                    .property(vertex.apiType.prop.name.N, typeName)
            ).next();


        createGraphQlApi.addE(edge.has_type.L).from_('new_api').to(api_type.value)

    }

    const result = await createGraphQlApi.select('new_api')
        .project('apiId', 'title', "shortDescription", "longDescription", 'apiType', 'apiUrl', 'graphQlSchema')
        .by(id)
        .by(__.values(vertex.graphQlApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.graphQlApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.graphQlApi.prop.longDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
        .by(__.values(vertex.graphQlApi.prop.apiUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.graphQlApi.prop.graphQlSchema.N).fold().coalesce(__.unfold(), __.constant('')))

        .next();


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

    const subscription = await g.addV(vertex.subscription.L)
        .property(id, subscriptionId1)
        .property(vertex.subscription.prop.paymentDayEveryMonth.N, subscriptionParams.paymentDayEveryMonth)
        .property(vertex.subscription.prop.subscriptionToken.N, subscription_token1)
        .as('sub')
        .addE(edge.subscription_for.L).from_('sub').to(__.V(apiId))
        .addE(edge.subscribes.L).from_(__.V(entityId)).to('sub').property(edge.subscribes.prop.timeStamp.N, timeStamp)
        .addE(edge.has_status.L).from_('sub').to(subscription_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .addE(edge.has_type.L).from_('sub').to(subscription_type.value)

        .addV(vertex.subscription.L)
        .property(id, subscriptionId2)
        .property(vertex.subscription.prop.paymentDayEveryMonth.N, subscriptionParams.paymentDayEveryMonth)
        .property(vertex.subscription.prop.subscriptionToken.N, subscription_token2)
        .as('sub')
        .addE(edge.subscription_for.L).from_('sub').to(__.V(apiId))
        .addE(edge.subscribes.L).from_(__.V(entityId)).to('sub').property(edge.subscribes.prop.timeStamp.N, timeStamp)
        .addE(edge.has_status.L).from_('sub').to(subscription_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .addE(edge.has_type.L).from_('sub').to(subscription_type.value)

        .addV(vertex.subscription.L)
        .property(id, subscriptionId3)
        .property(vertex.subscription.prop.paymentDayEveryMonth.N, subscriptionParams.paymentDayEveryMonth)
        .property(vertex.subscription.prop.subscriptionToken.N, subscription_token3)
        .as('sub')
        .addE(edge.subscription_for.L).from_('sub').to(__.V(apiId))
        .addE(edge.subscribes.L).from_(__.V(entityId)).to('sub').property(edge.subscribes.prop.timeStamp.N, timeStamp)
        .addE(edge.has_status.L).from_('sub').to(subscription_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .addE(edge.has_type.L).from_('sub').to(subscription_type.value)

        .next();

    console.log("sub", subscription);




    return result.value

}


export async function changeApiStatus(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: ChangeApiStatusInput, cognitoUsername: string) {
    const { apiId, status, entityId } = data;

    const errorString1 = `inputs "apiId" and "entityId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = `Api is already ${status}`;
    const errorString4 = 'either the api doesnt exist or the entity doesnt own it'
    const errorString5 = "this functionality has not been implemented yet"

    if (!apiId || !entityId){
        throw new Error(errorString1)

    }


    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, false)



    if (!confirmEntity) {

        throw new Error(errorString2)

    }




    let apiStatusVertexId;
    if (status === vertex.apiStatus.prop.name.V.UNDERDEVELOPMENT) {
        apiStatusVertexId = vertex.apiStatus.prop.id.V.apiStatusUnderdevelopment

        throw new Error(errorString5)
    }

    if (status === vertex.apiStatus.prop.name.V.PUBLIC) {
        apiStatusVertexId = vertex.apiStatus.prop.id.V.apiStatusPublic
    }

    if (status == vertex.apiStatus.prop.name.V.PRIVATE) {
        apiStatusVertexId = vertex.apiStatus.prop.id.V.apiStatusPrivate
    }







    const errorHandling = await g.V(entityId).coalesce(__.out(edge.creates.L).hasId(apiId).choose(__.out(edge.has_status.L).has(vertex.apiStatus.prop.name.N, status), __.constant(errorString3)), __.constant(errorString4)).next()



    if (errorHandling.value === errorString3) {
        throw new Error(errorString3)
    }

    if (errorHandling.value === errorString4) {
        throw new Error(errorString4)
    }




    const timeStamp = Date.now()

    const api_status = await g.V(apiStatusVertexId)
        .fold()
        .coalesce(__.unfold(),
            g.addV(vertex.apiStatus.L)
                .property(id, apiStatusVertexId)
                .property(vertex.apiStatus.prop.name.N, status)
        ).next();


    const result = await g.V(apiId).sideEffect(__.outE(edge.has_status.L).drop()).addE(edge.has_status.L).from_(__.V(apiId)).to(api_status.value).property(edge.has_status.prop.timeStamp.N, timeStamp)
        .outV()
        .project('apiId', 'title', 'shortDescription', "imageUrl", "apiType", "owner", 'status', 'numOfSubscribers', 'apiKind')
        .by(id)
        .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.values(vertex.openApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant('')))
        .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
        .by(
            __.in_(edge.creates.L).choose(__.hasLabel(vertex.user.L),
                __.project('__typename', 'id', "firstName", 'lastName', "picture_url")
                    .by(__.constant('userIdentifier'))
                    .by(id)
                    .by(__.values(vertex.user.prop.firstName.N).fold().coalesce(__.unfold(), __.constant('')))
                    .by(__.values(vertex.user.prop.lastName.N).fold().coalesce(__.unfold(), __.constant('')))
                    .by(__.values(vertex.user.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
                , __.project('__typename', 'id', 'name', "picture_url")
                    .by(__.constant('companyIdentifier'))
                    .by(id)
                    .by(__.values(vertex.company.prop.name.N).fold().coalesce(__.unfold(), __.constant('')))
                    .by(__.values(vertex.company.prop.pictureUrl.N).fold().coalesce(__.unfold(), __.constant('')))
            )
        )
        .by(__.out(edge.has_status.L).values(vertex.apiStatus.prop.name.N))
        .by(__.in_(edge.subscription_for.L).where(__.out(edge.has_type.L).has(vertex.subscriptionType.prop.name.N, vertex.subscriptionType.prop.name.V.NORMAL)).count())
        .by(__.choose(__.hasLabel(vertex.openApi.L), __.constant(ApiKind.Openapi), __.constant(ApiKind.Graphql)))
        
        .next();



    console.log("Response ==>", result.value);


    return result.value



}



export async function updateOpenApi(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: UpdateOpenApiInput, cognitoUsername: string) {

    let { apiId, entityId, title, apiType, longDescription, shortDescription, apiRootUrl, openApiDef } = data;

    const errorString1 = `inputs "apiId" and "entityId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = 'either the api doesnt exist or the entity doesnt own it'
    const errorString4 = 'You cannot select more than 3 api types'
   const errorString5 = 'select atleast 1 api type'

   
    if (!apiId || !entityId){
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


    let updateOpenApi = g.V(apiId)


    if (title) {

        updateOpenApi.property(single, vertex.openApi.prop.title.N, title)

    }

    if (longDescription) {

        updateOpenApi.property(single, vertex.openApi.prop.longDescription.N, longDescription)

    }

    if (shortDescription) {

        updateOpenApi.property(single, vertex.openApi.prop.shortDescription.N, shortDescription)

    }

    if (apiRootUrl) {

        updateOpenApi.property(single, vertex.openApi.prop.apiRootUrl.N, apiRootUrl)

    }


    if (openApiDef) {

        updateOpenApi.property(single, vertex.openApi.prop.openApiDef.N, openApiDef)

    }

    

    if (apiType){

        apiType = apiType.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })

       

        if (apiType.length > 3) {
            throw new Error(errorString4)
    
        }

        if (apiType.length === 0){
            throw new Error(errorString5)

        }


        const apiCurrentTypes = await g.V(apiId).out(edge.has_type.L).values(vertex.apiType.prop.name.N).toList()

        console.log(apiCurrentTypes)

        const commonTypes = apiType.filter(value => apiCurrentTypes.includes(value));

        console.log(commonTypes)
        await g.V(apiId).outE(edge.has_type.L).where(__.inV().not(__.has(vertex.apiType.prop.name.N,within(...commonTypes)))).drop().next()

        const newTypes = apiType.filter(function(obj) { return apiCurrentTypes.indexOf(obj) == -1; });

        console.log(newTypes)
        const addNewTypes = g.V(apiId)

        let vertexId;

        for (let newType of newTypes){


            switch (newType) {

                case vertex.apiType.prop.name.V.CRM:
                    vertexId = vertex.apiType.prop.id.V.apiType_CRM
                    break;
                case vertex.apiType.prop.name.V.ERP:
                    vertexId = vertex.apiType.prop.id.V.apiType_ERP
                    break;
    
                case vertex.apiType.prop.name.V.ACCOUNTING:
                    vertexId = vertex.apiType.prop.id.V.apiType_ACCOUNTING
                    break;
    
                case vertex.apiType.prop.name.V.PM:
                    vertexId = vertex.apiType.prop.id.V.apiType_PM
                    break;
    
    
                case vertex.apiType.prop.name.V.CMS:
                    vertexId = vertex.apiType.prop.id.V.apiType_CMS
                    break;
    
                case vertex.apiType.prop.name.V.COMMUNICATION:
                    vertexId = vertex.apiType.prop.id.V.apiType_COMMUNICATION
                    break;
    
                case vertex.apiType.prop.name.V.ECOMMERCE:
                    vertexId = vertex.apiType.prop.id.V.apiType_ECOMMERCE
                    break;
    
                case vertex.apiType.prop.name.V.HRM:
                    vertexId = vertex.apiType.prop.id.V.apiType_HRM
                    break;
    
                case vertex.apiType.prop.name.V.PAYMENT_GATEWAY:
                    vertexId = vertex.apiType.prop.id.V.apiType_PAYMENT_GATEWAY
                    break;
    
    
                case vertex.apiType.prop.name.V.BILLING:
                    vertexId = vertex.apiType.prop.id.V.apiType_BILLING
                    break;
    
    
                case vertex.apiType.prop.name.V.FINANCE:
                    vertexId = vertex.apiType.prop.id.V.apiType_FINANCE
                    break;
    
    
                case vertex.apiType.prop.name.V.EDUCATION:
                    vertexId = vertex.apiType.prop.id.V.apiType_EDUCATION
                    break;
                case vertex.apiType.prop.name.V.MEDICAL:
                    vertexId = vertex.apiType.prop.id.V.apiType_MEDICAL
                    break;
                case vertex.apiType.prop.name.V.MUSIC:
                    vertexId = vertex.apiType.prop.id.V.apiType_MUSIC
                    break;
    
    
                case vertex.apiType.prop.name.V.NEWS:
                    vertexId = vertex.apiType.prop.id.V.apiType_NEWS
                    break;
    
                case vertex.apiType.prop.name.V.SOCIAL_NETWORKING:
                    vertexId = vertex.apiType.prop.id.V.apiType_SOCIAL_NETWORKING
                    break;
                case vertex.apiType.prop.name.V.WEATHER:
                    vertexId = vertex.apiType.prop.id.V.apiType_WEATHER
                    break;
    
    
                case vertex.apiType.prop.name.V.LIFESTYLE:
                    vertexId = vertex.apiType.prop.id.V.apiType_LIFESTYLE
                    break;
                case vertex.apiType.prop.name.V.PRODUCTIVITY:
                    vertexId = vertex.apiType.prop.id.V.apiType_PRODUCTIVITY
                    break;
                case vertex.apiType.prop.name.V.SPORTS:
                    vertexId = vertex.apiType.prop.id.V.apiType_SPORTS
                    break;
    
    
                case vertex.apiType.prop.name.V.TRAVEL:
                    vertexId = vertex.apiType.prop.id.V.apiType_TRAVEL
                    break;
    
                case vertex.apiType.prop.name.V.FOOD:
                    vertexId = vertex.apiType.prop.id.V.apiType_FOOD
                    break;
    
                case vertex.apiType.prop.name.V.PHOTO_VIDEO:
                    vertexId = vertex.apiType.prop.id.V.apiType_PHOTO_VIDEO
                    break;
    
    
                case vertex.apiType.prop.name.V.UTILITIES:
                    vertexId = vertex.apiType.prop.id.V.apiType_UTILITIES
                    break;
    
    
                case vertex.apiType.prop.name.V.DATA:
                    vertexId = vertex.apiType.prop.id.V.apiType_DATA
                    break;
    
    
                case vertex.apiType.prop.name.V.AI:
                    vertexId = vertex.apiType.prop.id.V.apiType_AI
                    break;
    
    
    
    
                case vertex.apiType.prop.name.V.IOT:
                    vertexId = vertex.apiType.prop.id.V.apiType_IOT
                    break;
    
    
                case vertex.apiType.prop.name.V.BLOCKCHAIN_CRYPTO:
                    vertexId = vertex.apiType.prop.id.V.apiType_BLOCKCHAIN_CRYPTO
                    break;
    
    
                case vertex.apiType.prop.name.V.BUSINESS:
                    vertexId = vertex.apiType.prop.id.V.apiType_BUSINESS
                    break;
    
                case vertex.apiType.prop.name.V.REFERENCE:
                    vertexId = vertex.apiType.prop.id.V.apiType_REFERENCE
                    break;
    
                case vertex.apiType.prop.name.V.HEALTH_FITNESS:
                    vertexId = vertex.apiType.prop.id.V.apiType_HEALTH_FITNESS
                    break;
    
            }



        await g.V(vertexId).fold().coalesce(__.unfold(),__.addV(vertex.apiType.L).property(id,vertexId).property(vertex.apiType.prop.name.N, newType)).next()

        addNewTypes.addE(edge.has_type.L).from_(__.V(apiId)).to(__.V(vertexId))
        }


        await addNewTypes.next()

    }





    const result = await updateOpenApi
    .project('apiId', 'title', "shortDescription", "longDescription", 'apiType','apiRootUrl','openApiDef')
    .by(id)
    .by(__.values(vertex.openApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.longDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(__.values(vertex.openApi.prop.apiRootUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.openApi.prop.openApiDef.N).fold().coalesce(__.unfold(), __.constant(''))).next()

    

    console.log(result.value)

    return result.value




}





export async function updateGraphQlApi(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: UpdateGraphQlInput, cognitoUsername: string) {

    let { apiId, entityId, title, apiType, longDescription, shortDescription, apiUrl, graphQlSchema } = data;

    const errorString1 = `inputs "apiId" and "entityId" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = 'either the api doesnt exist or the entity doesnt own it'
    const errorString4 = 'You cannot select more than 3 api types'
   const errorString5 = 'select atleast 1 api type'


    if (!apiId || !entityId){
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


    let updateGraphQlApi = g.V(apiId)


    if (title) {

        updateGraphQlApi.property(single, vertex.graphQlApi.prop.title.N, title)

    }

    if (longDescription) {

        updateGraphQlApi.property(single, vertex.graphQlApi.prop.longDescription.N, longDescription)

    }

    if (shortDescription) {

        updateGraphQlApi.property(single, vertex.graphQlApi.prop.shortDescription.N, shortDescription)

    }

    if (apiUrl) {

        updateGraphQlApi.property(single, vertex.graphQlApi.prop.apiUrl.N, apiUrl)

    }


    if (graphQlSchema) {

        updateGraphQlApi.property(single, vertex.graphQlApi.prop.graphQlSchema.N, graphQlSchema)

    }

    

    if (apiType){

        apiType = apiType.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })

       

        if (apiType.length > 3) {
            throw new Error(errorString4)
    
        }

        if (apiType.length === 0){
            throw new Error(errorString5)

        }

        const apiCurrentTypes = await g.V(apiId).out(edge.has_type.L).values(vertex.apiType.prop.name.N).toList()

        console.log(apiCurrentTypes)

        const commonTypes = apiType.filter(value => apiCurrentTypes.includes(value));

        console.log(commonTypes)
        await g.V(apiId).outE(edge.has_type.L).where(__.inV().not(__.has(vertex.apiType.prop.name.N,within(...commonTypes)))).drop().next()

        const newTypes = apiType.filter(function(obj) { return apiCurrentTypes.indexOf(obj) == -1; });

        console.log(newTypes)
        const addNewTypes = g.V(apiId)

        let vertexId;

        for (let newType of newTypes){


            switch (newType) {

                case vertex.apiType.prop.name.V.CRM:
                    vertexId = vertex.apiType.prop.id.V.apiType_CRM
                    break;
                case vertex.apiType.prop.name.V.ERP:
                    vertexId = vertex.apiType.prop.id.V.apiType_ERP
                    break;
    
                case vertex.apiType.prop.name.V.ACCOUNTING:
                    vertexId = vertex.apiType.prop.id.V.apiType_ACCOUNTING
                    break;
    
                case vertex.apiType.prop.name.V.PM:
                    vertexId = vertex.apiType.prop.id.V.apiType_PM
                    break;
    
    
                case vertex.apiType.prop.name.V.CMS:
                    vertexId = vertex.apiType.prop.id.V.apiType_CMS
                    break;
    
                case vertex.apiType.prop.name.V.COMMUNICATION:
                    vertexId = vertex.apiType.prop.id.V.apiType_COMMUNICATION
                    break;
    
                case vertex.apiType.prop.name.V.ECOMMERCE:
                    vertexId = vertex.apiType.prop.id.V.apiType_ECOMMERCE
                    break;
    
                case vertex.apiType.prop.name.V.HRM:
                    vertexId = vertex.apiType.prop.id.V.apiType_HRM
                    break;
    
                case vertex.apiType.prop.name.V.PAYMENT_GATEWAY:
                    vertexId = vertex.apiType.prop.id.V.apiType_PAYMENT_GATEWAY
                    break;
    
    
                case vertex.apiType.prop.name.V.BILLING:
                    vertexId = vertex.apiType.prop.id.V.apiType_BILLING
                    break;
    
    
                case vertex.apiType.prop.name.V.FINANCE:
                    vertexId = vertex.apiType.prop.id.V.apiType_FINANCE
                    break;
    
    
                case vertex.apiType.prop.name.V.EDUCATION:
                    vertexId = vertex.apiType.prop.id.V.apiType_EDUCATION
                    break;
                case vertex.apiType.prop.name.V.MEDICAL:
                    vertexId = vertex.apiType.prop.id.V.apiType_MEDICAL
                    break;
                case vertex.apiType.prop.name.V.MUSIC:
                    vertexId = vertex.apiType.prop.id.V.apiType_MUSIC
                    break;
    
    
                case vertex.apiType.prop.name.V.NEWS:
                    vertexId = vertex.apiType.prop.id.V.apiType_NEWS
                    break;
    
                case vertex.apiType.prop.name.V.SOCIAL_NETWORKING:
                    vertexId = vertex.apiType.prop.id.V.apiType_SOCIAL_NETWORKING
                    break;
                case vertex.apiType.prop.name.V.WEATHER:
                    vertexId = vertex.apiType.prop.id.V.apiType_WEATHER
                    break;
    
    
                case vertex.apiType.prop.name.V.LIFESTYLE:
                    vertexId = vertex.apiType.prop.id.V.apiType_LIFESTYLE
                    break;
                case vertex.apiType.prop.name.V.PRODUCTIVITY:
                    vertexId = vertex.apiType.prop.id.V.apiType_PRODUCTIVITY
                    break;
                case vertex.apiType.prop.name.V.SPORTS:
                    vertexId = vertex.apiType.prop.id.V.apiType_SPORTS
                    break;
    
    
                case vertex.apiType.prop.name.V.TRAVEL:
                    vertexId = vertex.apiType.prop.id.V.apiType_TRAVEL
                    break;
    
                case vertex.apiType.prop.name.V.FOOD:
                    vertexId = vertex.apiType.prop.id.V.apiType_FOOD
                    break;
    
                case vertex.apiType.prop.name.V.PHOTO_VIDEO:
                    vertexId = vertex.apiType.prop.id.V.apiType_PHOTO_VIDEO
                    break;
    
    
                case vertex.apiType.prop.name.V.UTILITIES:
                    vertexId = vertex.apiType.prop.id.V.apiType_UTILITIES
                    break;
    
    
                case vertex.apiType.prop.name.V.DATA:
                    vertexId = vertex.apiType.prop.id.V.apiType_DATA
                    break;
    
    
                case vertex.apiType.prop.name.V.AI:
                    vertexId = vertex.apiType.prop.id.V.apiType_AI
                    break;
    
    
    
    
                case vertex.apiType.prop.name.V.IOT:
                    vertexId = vertex.apiType.prop.id.V.apiType_IOT
                    break;
    
    
                case vertex.apiType.prop.name.V.BLOCKCHAIN_CRYPTO:
                    vertexId = vertex.apiType.prop.id.V.apiType_BLOCKCHAIN_CRYPTO
                    break;
    
    
                case vertex.apiType.prop.name.V.BUSINESS:
                    vertexId = vertex.apiType.prop.id.V.apiType_BUSINESS
                    break;
    
                case vertex.apiType.prop.name.V.REFERENCE:
                    vertexId = vertex.apiType.prop.id.V.apiType_REFERENCE
                    break;
    
                case vertex.apiType.prop.name.V.HEALTH_FITNESS:
                    vertexId = vertex.apiType.prop.id.V.apiType_HEALTH_FITNESS
                    break;
    
            }



        await g.V(vertexId).fold().coalesce(__.unfold(),__.addV(vertex.apiType.L).property(id,vertexId).property(vertex.apiType.prop.name.N, newType)).next()

        addNewTypes.addE(edge.has_type.L).from_(__.V(apiId)).to(__.V(vertexId))
        }


        await addNewTypes.next()

    }





    const result = await updateGraphQlApi
    .project('apiId', 'title', "shortDescription", "longDescription", 'apiType','apiUrl','graphQlSchema')
    .by(id)
    .by(__.values(vertex.graphQlApi.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.graphQlApi.prop.shortDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.graphQlApi.prop.longDescription.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.out(edge.has_type.L).values(vertex.apiType.prop.name.N).fold())
    .by(__.values(vertex.graphQlApi.prop.apiUrl.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.graphQlApi.prop.graphQlSchema.N).fold().coalesce(__.unfold(), __.constant(''))).next()

    

    console.log(result.value)

    return result.value




}





export async function changeApiImage(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: UpdateApiImageInput, cognitoUsername: string) {

    const { apiId, entityId, picture_url } = data;
 


    const errorString1 = `inputs "apiId", "entityId" and "picture_url" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = 'either the api doesnt exist or the entity doesnt own it'
   


    if (!apiId || !entityId || !picture_url){
        throw new Error(errorString1)

    }

    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, entityId, cognitoUsername, true)

    if (!confirmEntity) {
        throw new Error(errorString2)
    }

    const errorHandling = await g.V(entityId).coalesce(__.out(edge.creates.L).hasId(apiId), __.constant(errorString3)).next()

    if (errorHandling.value === errorString3) {
        throw new Error(errorString3)
    }



    const result = await g.V(apiId).property(single,vertex.graphQlApi.prop.imageUrl.N, picture_url).project("id","picture_url")
    .by(id)
    .by(__.values(vertex.graphQlApi.prop.imageUrl.N).fold().coalesce(__.unfold(), __.constant(''))).next()



    return result.value



}





export async function createApiReview(g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>, data: CreateApiReviewInput, cognitoUsername: string) {

    let { title, text,stars, by, apiId } = data;

    
    const errorString1 = `inputs "apiId", "by", "title", "text" and "stars" cannot be empty strings`
    const errorString2 = "an invalid error occured"
    const errorString3 = "stars cannot be less than 0 and greater than 5"
    const errorString4 = "api not found"
    const errorString5 = "entity owns this api. They cannot review their own apis"
    const errorString6 = "entity not subscribes to this api. They need to subscribe to an api to review it"
    const errorString7 = "entity has already reviewed this api"

    if (!title || !text || !stars || !by || !apiId){
        throw new Error(errorString1)
    }


    const confirmEntity = await identityVerifier.confirmEntityFromCognito(g, by, cognitoUsername, false)

    if (!confirmEntity) {
        throw new Error(errorString2)
    }

    if (stars< 1 || stars >5){

        throw new Error(errorString3)

    }


    const errorHandling  = await g.V(apiId).hasLabel(vertex.graphQlApi.L, vertex.openApi.L).fold().coalesce(__.unfold().coalesce(__.in_(edge.creates.L).not(__.hasId(by))
    .coalesce(__.V(by).out(edge.subscribes.L).where(__.out(edge.subscription_for.L).hasId(apiId))
    .choose(__.V(apiId).in_(edge.review_for.L).out(edge.reviewed_by.L).hasId(by)
    ,__.constant(errorString7))
    ,__.constant(errorString6))
    ,__.constant(errorString5))
    ,__.constant(errorString4)).next()

    
    if (errorHandling.value === errorString4){

        throw new Error(errorString4)

    }

    if (errorHandling.value === errorString5){

        throw new Error(errorString5)

    }

    if (errorHandling.value === errorString6){

        throw new Error(errorString6)

    }

    if (errorHandling.value === errorString7){

        throw new Error(errorString7)

    }

    const timeStamp = Date.now()


    const output = await g.addV(vertex.apiReview.L)
    .property(vertex.apiReview.prop.text.N, text)
    .property(vertex.apiReview.prop.title.N, title)
    .property(vertex.apiReview.prop.stars.N, stars).as('review')
    .addE(edge.review_for.L).from_('review').to(__.V(apiId))
    .addE(edge.reviewed_by.L).from_('review').to(__.V(by)).property(edge.reviewed_by.prop.timeStamp.N,timeStamp)
    .select('review').project('reviewId','by','apiId','title','text','stars','dateCreated')
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
    .by(__.values(vertex.apiReview.prop.title.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.apiReview.prop.text.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.values(vertex.apiReview.prop.stars.N).fold().coalesce(__.unfold(), __.constant('')))
    .by(__.outE(edge.reviewed_by.L).values(edge.reviewed_by.prop.timeStamp.N))
    .next()


    console.log(output.value)
    return output.value

}