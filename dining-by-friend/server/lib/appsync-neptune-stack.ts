import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as neptune from '@aws-cdk/aws-neptune';
import * as cognito from "@aws-cdk/aws-cognito";

export class AppsyncNeptuneStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'NeptuneAPI',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        },
      },
    })

    const vpc = new ec2.Vpc(this, 'NewNeptuneVPC');

    const lambdaFn = new lambda.Function(this, 'Lambda Function', {
     runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambda-fns'),
      memorySize: 1024,
      vpc
    })
    
    // set the new Lambda function as a data source for the AppSync API
    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', lambdaFn);

    //Query
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "userFriendList"
    })
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "friendofFriend"
    })
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "recommendByFriend"
    })
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "restaurantRatedByFriend"
    })
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "restaurantBycuisine"
    })
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "newestReview"
    })
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "nearestHRRestaurant"
    })
    // lambdaDs.createResolver({
    //   typeName: "Query",
    //   fieldName: "pastXDays"
    // })

    //test queries resovler
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getReview"
    })
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getRestaurant"
    })
    //Vertices
    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addUser"
    })
    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addReviews"
    })
    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addRestaurant"
    })
    //Edges
    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createFriendShip"
    })
    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addReview"
    })
    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "recommendRestaurant"
    })
    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "about"
    })

    //Neptune Cluster
    const cluster = new neptune.DatabaseCluster(this, 'NeptuneCluster', {
      vpc,
      instanceType: neptune.InstanceType.T3_MEDIUM
    })

    cluster.connections.allowDefaultPortFromAnyIpv4('Open to the world')

    const writeAddress = cluster.clusterEndpoint.socketAddress;

    new cdk.CfnOutput(this, 'writeaddress', {
      value: writeAddress
    })

    const readAddress = cluster.clusterReadEndpoint.socketAddress

    new cdk.CfnOutput(this, 'readaddress', {
      value: readAddress
    })

    lambdaFn.addEnvironment('WRITER', writeAddress)
    lambdaFn.addEnvironment('READER', readAddress)

    //COGNITO
    const authEmailFn = new lambda.Function(this, 'authEmailFn', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'cognito.handler',
      code: lambda.Code.fromAsset('lambda'),
    });

    const userPool = new cognito.UserPool(this, "UserPool", {
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: { email: true }, // Set email as an alias means now you will use email address to authenticate not with username
      userVerification: {
        emailSubject: 'Verify your email for our awesome app!',
        emailBody: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage: 'Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}',
      },                                ///customize email and sms
      lambdaTriggers: {
        preSignUp: authEmailFn      ///Trigger before the signup process to userpool
      }
    });
  

  }
 }