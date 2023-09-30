import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as neptune from "@aws-cdk/aws-neptune";
import * as appsync from '@aws-cdk/aws-appsync';
import * as cognito from "@aws-cdk/aws-cognito";
import { Secret } from '@aws-cdk/aws-secretsmanager';
import * as apigw from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";

// interface EnvProps {
//   deployEnv: string
// }

interface EnvProps {
  prod: string;
}

export class NeptuneApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: EnvProps) {
    super(scope, id);

    // The code that defines your stack goes here

    const vpc = new ec2.Vpc(this, "Vpc", {
      subnetConfiguration: [
        {
          cidrMask: 24, // Creates a size /24 IPv4 subnet (a range of 256 private IP addresses) in the VPC
          name: 'Ingress',
          subnetType: ec2.SubnetType.ISOLATED,
        }
      ]
    });

    const dependenciesLayer = new lambda.LayerVersion(this, "dependencies", {
      layerVersionName: "Dependencies",
      code: lambda.Code.fromAsset("lambda-layer"),
    });

    
    // Create a security group and subnetgroup to ensure lambda and neptune cluster deploy on the same vpc
    const sg1 = new ec2.SecurityGroup(this, "mySecurityGroup1", {
      vpc,
      allowAllOutbound: true,
      description: "security group 1",
      securityGroupName: "mySecurityGroup",
    });
    cdk.Tags.of(sg1).add("Name", "mySecurityGroup");

    sg1.addIngressRule(sg1, ec2.Port.tcp(8182), "MyRule");

    const neptuneSubnet = new neptune.CfnDBSubnetGroup(
      this,
      "neptuneSubnetGroup",
      {
        dbSubnetGroupDescription: "My Subnet",
        subnetIds: vpc.selectSubnets({ subnetType: ec2.SubnetType.ISOLATED })
          .subnetIds,
        dbSubnetGroupName: `${props?.prod}-mysubnetgroup`,
      }
    );

    // Creating neptune cluster
    const neptuneCluster = new neptune.CfnDBCluster(this, "MyCluster", {
      dbSubnetGroupName: neptuneSubnet.dbSubnetGroupName,
      dbClusterIdentifier: `${props?.prod}-myDbCluster`,
      vpcSecurityGroupIds: [sg1.securityGroupId],
    });
    neptuneCluster.addDependsOn(neptuneSubnet);


    // Creating neptune instance
    const neptuneInstance = new neptune.CfnDBInstance(this, "myinstance", {
      dbInstanceClass: "db.t3.medium",
      dbClusterIdentifier: neptuneCluster.dbClusterIdentifier,
      availabilityZone: vpc.availabilityZones[0],
    });
    neptuneInstance.addDependsOn(neptuneCluster);

    const preSignup = new lambda.Function(this, "createUserPostLambda", {
      functionName: `${props?.prod}-createUserPostLambda`,
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda/preSignup"),
      handler: "index.handler",
      environment: {
        NEPTUNE_ENDPOINT: neptuneCluster.attrEndpoint
      },
      timeout: cdk.Duration.seconds(10),
      layers: [dependenciesLayer],
      securityGroups: [sg1],
      vpc: vpc,
      vpcSubnets:
      {
        subnetType: ec2.SubnetType.ISOLATED
      }
    });


    let userPool;
    let api_gatway;
    if(props?.prod == 'test'){


      userPool = new cognito.UserPool(this, "PanacloudUserpool", {
        userPoolName: `${props?.prod}-PanacloudUserpool`,
        selfSignUpEnabled: true,
        accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        userVerification: {
          emailStyle: cognito.VerificationEmailStyle.CODE
        },

          autoVerify: {
          email: true
        },
      
        signInAliases: {
          email: true,
          username: true
        },

        standardAttributes: {
        // phoneNumber: {
        //   required: false,
        //   mutable: true
        // },

          email: {
            required: true,
            mutable: true
          },
        },
    
        lambdaTriggers: {
          preSignUp: preSignup
        }
      });

      const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
        userPool,
        authFlows: {
          userPassword: true,
          adminUserPassword: true
        }
      });

      const signupLambda = new lambda.Function(this, "signupLambda", {
        functionName: `${props?.prod}-signupLambda`,
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("lambda/Auth"),
        handler: "signup.handler",
        environment: {
          USERPOOL_CLIENT: userPoolClient.userPoolClientId,
          USER_POOL_ID: userPool.userPoolId
        },
        timeout: cdk.Duration.seconds(10)
      });

      const policy = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['cognito-idp:*', "lambda:*"],
        resources: ['*']
      });

      signupLambda.addToRolePolicy(policy);

      const loginLambda = new lambda.Function(this, "loginLambda", {
        functionName: `${props?.prod}-loginLambda`,
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("lambda/Auth"),
        handler: "login.handler",
        environment: {
          USERPOOL_CLIENT: userPoolClient.userPoolClientId,
          USER_POOL_ID: userPool.userPoolId
        },
        timeout: cdk.Duration.seconds(10)
      });

      loginLambda.addToRolePolicy(policy);

      api_gatway = new apigw.RestApi(this, 'AuthTestApi', {
        restApiName: 'authApi',
        defaultCorsPreflightOptions: {
          allowOrigins: apigw.Cors.ALL_ORIGINS,
          allowMethods: apigw.Cors.ALL_METHODS, // this is also the default
        }
      });

      const signup = api_gatway.root.addResource('signup');
      const getAllIntegration = new apigw.LambdaIntegration(signupLambda);
      signup.addMethod('POST', getAllIntegration);

      const login = api_gatway.root.addResource('login');
      const loginIntegration = new apigw.LambdaIntegration(loginLambda);
      login.addMethod('POST', loginIntegration);

      new cdk.CfnOutput(this, "API GATEWAY.", {
        value: api_gatway.url
      })

    }
    else{
      userPool = new cognito.UserPool(this, "PanacloudUserpool", {
      userPoolName: `${props?.prod}-PanacloudUserpool`,
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE
      },
    
      signInAliases: {
        email: true,
        username: true
      },

    standardAttributes: {
        // phoneNumber: {
        //   required: false,
        //   mutable: true
        // },

        email: {
          required: true,
          mutable: true
        },
      },
    
        lambdaTriggers: {
          preSignUp: preSignup
        }
      });

      const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
        userPool
      });
    }

    // add this code after the VPC code
    const handler = new lambda.Function(this, "Lambda", {
      functionName: `${props?.prod}-main-handler`,
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("lambda"),
      handler: "main.handler",
      securityGroups: [sg1],
      vpc: vpc,
      environment: {
        NEPTUNE_ENDPOINT: neptuneCluster.attrEndpoint
      },
      layers: [dependenciesLayer],
      vpcSubnets:
      {
        subnetType: ec2.SubnetType.ISOLATED
      }
    });



    //   //https://github.com/aws-samples/aws-dbs-refarch-graph/tree/master/src/accessing-from-aws-lambda
    //   //We will review this link and update our code latter to put the lambda outside the VPC

    new cdk.CfnOutput(this, "Neptune Endpoint.", {
      value: neptuneCluster.attrEndpoint
    })



  // cognito remove for testing purpose
  const api = new appsync.GraphqlApi(this, "graphDbNewApi", {
    name: `${props?.prod}-graphDbNewApi`,
    schema: appsync.Schema.fromAsset("graphql/schema.gql"),
    authorizationConfig: {
      defaultAuthorization: {
        userPoolConfig: { userPool },
        authorizationType: appsync.AuthorizationType.USER_POOL,
      },
      additionalAuthorizationModes: [{ authorizationType: appsync.AuthorizationType.API_KEY }]
    },
  },
  ) 

  new cdk.CfnOutput(this, "GraphQLAPIURL", {
    value: api.graphqlUrl,
  })

  if(props?.prod == 'test'){

    const secret = new Secret(this, 'Secret', {
      description: "My Api Url",
      secretName: 'api_info',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({'url' : api.graphqlUrl, 'api_key': api.apiKey, "auth_url": api_gatway?.url}),
        generateStringKey: 'apiUrl',
      }
    });
  }

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
  

  
  
  }
}