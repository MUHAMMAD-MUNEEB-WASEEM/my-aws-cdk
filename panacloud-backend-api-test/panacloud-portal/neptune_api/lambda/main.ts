//https://docs.aws.amazon.com/neptune/latest/userguide/access-graph-gremlin-node-js.html
//https://docs.aws.amazon.com/neptune/latest/userguide/lambda-functions-examples.html

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { driver, process as gprocess, structure } from 'gremlin';
import * as async from 'async';
import { createCompany, updateCompanyInfo, addUserToCompany, updateProfilePicture, changeEntityProfileStatus,requestRecommendation,writeRecommendation,cancelRecommendationRequest,deleteRecommendation } from './mutations/entity'
import { fetchMyApiTestingSubscriptions, fetchMyApiSubscription } from './queries/subscription/index'
import {
    subscribeToApi,
    changeSubscriptionStatus,
    createNewTestingSubscription
} from "./mutations/subscription/index";

import { followEntity, unFollowEntity, publishSocialMediaPost, commentOnSocialMediaPost, likeOnSocialMediaPost } from './mutations/socialMedia'
import { getEntityFollowers, getEntityFollowings, getEntityPosts, getPostComments, getEntityNewsFeed,getNewsFeedSideMenu } from './queries/socialMedia'
import { updateUser } from "./mutations/entity"
import { fetchMyCompanies, getEntityProfile, getUsersList,getUsersListInCompany,getRecommendationRequestsByMe,getRecommendationRequestsForMe,getRecommendationsByMe,getRecommendationsForMe } from "./queries/entity"


import { createOpenApi, createGraphQlApi, changeApiStatus, updateOpenApi, updateGraphQlApi, changeApiImage, createApiReview } from "./mutations/api"
import { fetchMyPrivateApis, fetchMyPublicApis, fetchMyUnderDevelopmentApis, fetchMySubscribedApis, fetchAllPublicApis, fetchMyApiToken, fetchApiInfo, getPublicApisCountByType,fetchApiReviews } from "./queries/api"


declare var process: {
    env: {
        NEPTUNE_ENDPOINT: string
    }
}

let conn: driver.DriverRemoteConnection;
let g: gprocess.GraphTraversalSource;

// async function query() {
//     return g.addV('a').next();
// }




export async function handler(event: any, context: Context, callback: any) {

    console.log(event)


    async function doQuery() {


        try {
            switch (event.info.fieldName) {

                //mutations
                case 'createCompany':
                    return await createCompany(g, event.arguments.input, event.identity.username)
                case 'updateCompanyInfo':
                    return await updateCompanyInfo(g, event.arguments.input, event.identity.username)
                case 'addUserToCompany':
                    return await addUserToCompany(g, event.arguments.input, event.identity.username)
                case 'updateProfilePicture':
                    return await updateProfilePicture(g, event.arguments.input, event.identity.username)
                case 'changeEntityProfileStatus':
                    return await changeEntityProfileStatus(g, event.arguments.input, event.identity.username)
                case "subscribeToApi":
                    return await subscribeToApi(g, event.arguments.input, event.identity.username);
                case "changeSubscriptionStatus":
                    return await changeSubscriptionStatus(g, event.arguments.input, event.identity.username);
                case "updateUserInfo":
                    return updateUser(g, event.arguments.input, event.identity.username);
                case "createOpenApi":
                    return createOpenApi(g, event.arguments.input, event.identity.username);
                case "createGraphQlApi":
                    return createGraphQlApi(g, event.arguments.input, event.identity.username);
                case "changeApiStatus":
                    return changeApiStatus(g, event.arguments.input, event.identity.username);
                case "followEntity":
                    return followEntity(g, event.arguments.input, event.identity.username);
                case "unFollowEntity":
                    return unFollowEntity(g, event.arguments.input, event.identity.username);
                case "publishSocialMediaPost":
                    return publishSocialMediaPost(g, event.arguments.input, event.identity.username);
                case "commentOnSocialMediaPost":
                    return commentOnSocialMediaPost(g, event.arguments.input, event.identity.username);
                case "likeOnSocialMediaPost":
                    return likeOnSocialMediaPost(g, event.arguments.input, event.identity.username);
                case "updateOpenApi":
                    return updateOpenApi(g, event.arguments.input, event.identity.username);
                case "updateGraphQlApi":
                    return updateGraphQlApi(g, event.arguments.input, event.identity.username);
                case "updateApiImage":
                    return changeApiImage(g, event.arguments.input, event.identity.username);
                case "createNewTestingSubscription":
                    return createNewTestingSubscription(g, event.arguments.input, event.identity.username);

                case "createApiReview":
                    return createApiReview(g, event.arguments.input, event.identity.username);


                    case "requestRecommendation":
                        return requestRecommendation(g, event.arguments.input, event.identity.username);
    
    

                        case "writeRecommendation":
                            return writeRecommendation(g, event.arguments.input, event.identity.username);
        
        
                            
                        case "cancelRecommendationRequest":
                            return cancelRecommendationRequest(g, event.arguments.input, event.identity.username);
        
        
                            case "deleteRecommendation":
                                return deleteRecommendation(g, event.arguments.input, event.identity.username);
            
                            
                            

                    

                //queries
                case 'fetchMyUnderDevelopmentApis':
                    return await fetchMyUnderDevelopmentApis(g, event.arguments.input, event.identity.username)
                case 'fetchMyPrivateApis':
                    return await fetchMyPrivateApis(g, event.arguments.input, event.identity.username)
                case 'fetchMyApiTestingSubscriptions':
                    return await fetchMyApiTestingSubscriptions(g, event.arguments.input, event.identity.username)
                case "fetchMyPublicApis":
                    return await fetchMyPublicApis(g, event.arguments.input, event.identity.username);
                case "fetchMySubscribedApis":
                    return await fetchMySubscribedApis(g, event.arguments.input, event.identity.username);
                case "fetchAllPublicApis":
                    return await fetchAllPublicApis(g, event.arguments.input, event.identity? event.identity.username: null);
                case "fetchMyApiSubscription":
                    return await fetchMyApiSubscription(g, event.arguments.input, event.identity.username);
                case "fetchMyApiToken":
                    return await fetchMyApiToken(g, event.arguments.input, event.identity.username);
                case "fetchApiInfo":
                    return await fetchApiInfo(g, event.arguments.input, event.identity? event.identity.username: null);
                case "fetchMyCompanies":
                    return await fetchMyCompanies(g, event.arguments.input, event.identity.username);
                case "getEntityFollowers":
                    return await getEntityFollowers(g, event.arguments.input, event.identity.username);
                case "getEntityFollowings":
                    return await getEntityFollowings(g, event.arguments.input, event.identity.username);
                case "getEntityPosts":
                    return await getEntityPosts(g, event.arguments.input, event.identity.username);
                case "getEntityProfile":
                    return await getEntityProfile(g, event.arguments.input,  event.identity? event.identity.username: null);
                case "getPostComments":
                    return await getPostComments(g, event.arguments.input);
                case 'getPublicApisCountByType':
                    return await getPublicApisCountByType(g)
                case 'getUsersList':
                    return await getUsersList(g, event.arguments.input,event.identity? event.identity.username: null)
                case "getEntityNewsFeed":
                    return getEntityNewsFeed(g, event.arguments.input, event.identity.username);

                case "fetchApiReviews":
                    return fetchApiReviews(g, event.arguments.input, event.identity.username);

                    
                case "fetchNewsFeedSideMenu":
                    return getNewsFeedSideMenu(g, event.arguments.input, event.identity.username);

                        
                    case "getUsersListInCompany":
                        return getUsersListInCompany(g, event.arguments.input, event.identity.username);
    

                        case "getRecommendationRequestsByMe":
                            return getRecommendationRequestsByMe(g, event.arguments.input, event.identity.username);
        
                 

                        case "getRecommendationRequestsForMe":
                            return getRecommendationRequestsForMe(g, event.arguments.input, event.identity.username);
        

                            
                        case "getRecommendationsByMe":
                            return getRecommendationsByMe(g, event.arguments.input, event.identity.username);
        

                            
                        case "getRecommendationsForMe":
                            return getRecommendationsForMe(g, event.arguments.input, event.identity.username);
        
                        
                            




                default:
                    throw new Error('invalid query')


            }

        }

        catch (e) {
            console.log(e)
            return callback(e)

        }


    }



    const getConnectionDetails = () => {
        const database_url = 'wss://' + process.env.NEPTUNE_ENDPOINT + ':8182/gremlin';
        return { url: database_url, headers: {} };
    };

    const createRemoteConnection = () => {
        const { url, headers } = getConnectionDetails();

        return new driver.DriverRemoteConnection(
            url,
            {
                mimeType: 'application/vnd.gremlin-v2.0+json',
                pingEnabled: false,
                headers: headers
            });
    };

    const createGraphTraversalSource = (conn: driver.DriverRemoteConnection) => {
        return gprocess.traversal().withRemote(conn);
    };

    if (conn == null) {
        conn = createRemoteConnection();
        g = createGraphTraversalSource(conn);
    }




    return async.retry(
        {
            times: 5,
            interval: 1000,
            errorFilter: function (err) {

                // Add filters here to determine whether error can be retried
                console.warn('Determining whether retriable error: ' + err.message);

                // Check for connection issues
                if (err.message.startsWith('WebSocket is not open')) {
                    console.warn('Reopening connection');
                    conn.close();
                    conn = createRemoteConnection();
                    g = createGraphTraversalSource(conn);
                    return true;
                }

                // Check for ConcurrentModificationException
                if (err.message.includes('ConcurrentModificationException')) {
                    console.warn('Retrying query because of ConcurrentModificationException');
                    return true;
                }

                // Check for ReadOnlyViolationException
                if (err.message.includes('ReadOnlyViolationException')) {
                    console.warn('Retrying query because of ReadOnlyViolationException');
                    return true;
                }

                return false;
            }

        },
        doQuery


    );



}