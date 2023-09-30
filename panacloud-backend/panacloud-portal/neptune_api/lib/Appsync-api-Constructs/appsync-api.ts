import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as neptune from "@aws-cdk/aws-neptune";
import * as appsync from '@aws-cdk/aws-appsync';
import * as cognito from "@aws-cdk/aws-cognito";

interface AppsyncApiProps {
  prod: string
  dependenciesLayer: lambda.LayerVersion
  userPool: cognito.UserPool
  neptuneRef: neptune.CfnDBCluster
  sgRef: ec2.SecurityGroup
  vpcRef: ec2.Vpc
}

export class AppsyncApi extends cdk.Construct {

    public readonly api: appsync.GraphqlApi;

    constructor(scope: cdk.Construct, id: string, props?: AppsyncApiProps) {
      super(scope, id);

        const handler = new lambda.Function(this, "Lambda", {
            functionName: `${props?.prod}-main-handler`,
            runtime: lambda.Runtime.NODEJS_10_X,
            code: new lambda.AssetCode("lambda"),
            handler: "main.handler",
            environment: {
                NEPTUNE_ENDPOINT: props?.neptuneRef.attrEndpoint!
            },
            layers: [props?.dependenciesLayer!],
            securityGroups: [props?.sgRef!],
            vpc: props?.vpcRef!,
            vpcSubnets:
            {
            subnetType: ec2.SubnetType.ISOLATED
            }
        });

        const api = new appsync.GraphqlApi(this, "graphDbNewApi", {
            name: `${props?.prod}-graphDbNewApi`,
            schema: appsync.Schema.fromAsset("graphql/schema.gql"),
            authorizationConfig: {
            defaultAuthorization: {
                userPoolConfig: { userPool: props?.userPool! },
                authorizationType: appsync.AuthorizationType.USER_POOL,
            },
            additionalAuthorizationModes: [{ authorizationType: appsync.AuthorizationType.API_KEY }]
            },
        })

        this.api = api;


        new cdk.CfnOutput(this, "GraphQLAPIURL", {
            value: api.graphqlUrl,
        })

        const lambda_data_source = api.addLambdaDataSource("lamdaDataSource", handler);

        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "createCompany"
        })

        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateCompanyInfo"
        })

        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "addUserToCompany"
        })
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateProfilePicture"
        })


        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "createOpenApi"
        })

        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "createGraphQlApi"
        })

        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "changeApiStatus"
        })

        
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "subscribeToApi"
        })

        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "changeSubscriptionStatus"
        })

        
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "changeEntityProfileStatus"
        })

        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateUserInfo"
        })



        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "followEntity"
        })


        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "unFollowEntity"
        })


        
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "publishSocialMediaPost"
        })

            
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "commentOnSocialMediaPost"
        })


            
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "likeOnSocialMediaPost"
        })


            
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateOpenApi"
        })


                
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateGraphQlApi"
        })


                
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "updateApiImage"
        })


                
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "createNewTestingSubscription"
        })


          
        lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "createApiReview"
          })
        
        
                    
          lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "requestRecommendation"
          })
        
          lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "writeRecommendation"
          })
        
          
          lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "cancelRecommendationRequest"
          })
        
          lambda_data_source.createResolver({
            typeName: "Mutation",
            fieldName: "deleteRecommendation"
          })
        





        
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchMyPrivateApis"
        })

        
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchMyUnderDevelopmentApis"
        })

        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchMyPublicApis"
        })


        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchMyApiTestingSubscriptions"
        })

        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchMySubscribedApis"
        })

        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchAllPublicApis"
        })

        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchMyApiSubscription"
        })

        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchMyApiToken"
        })

        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchMyCompanies"
        })

        
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getEntityFollowers"
        })

        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getEntityFollowings"
        })
        
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getEntityPosts"
        })
        
        
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getEntityProfile"
        })
        
            
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getPostComments"
        })
        
        
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getEntityNewsFeed"
        })

        
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "fetchApiInfo"
        })

        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "getPublicApisCountByType"
        })


      
  lambda_data_source.createResolver({
    typeName: "Query",
    fieldName: "getUsersList"
  })


  lambda_data_source.createResolver({
    typeName: "Query",
    fieldName: "fetchApiReviews"
  })
  

  lambda_data_source.createResolver({
    typeName: "Query",
    fieldName: "fetchNewsFeedSideMenu"
  })

  lambda_data_source.createResolver({
    typeName: "Query",
    fieldName: "getUsersListInCompany"
  })


  
  lambda_data_source.createResolver({
    typeName: "Query",
    fieldName: "getRecommendationRequestsByMe"
  })

  lambda_data_source.createResolver({
    typeName: "Query",
    fieldName: "getRecommendationRequestsForMe"
  })


  lambda_data_source.createResolver({
    typeName: "Query",
    fieldName: "getRecommendationsForMe"
  })


  lambda_data_source.createResolver({
    typeName: "Query",
    fieldName: "getRecommendationsByMe"
  })





    }

}