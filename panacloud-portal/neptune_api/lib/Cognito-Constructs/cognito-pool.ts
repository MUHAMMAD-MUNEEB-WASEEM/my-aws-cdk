import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as neptune from "@aws-cdk/aws-neptune";
import * as cognito from "@aws-cdk/aws-cognito";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";

interface CognitoProps {
  prod: string
  dependenciesLayer: lambda.LayerVersion
  neptuneRef: neptune.CfnDBCluster
  sgRef: ec2.SecurityGroup
  vpcRef: ec2.Vpc
}

export class CognitoPool extends cdk.Construct {

    public readonly userPool: cognito.UserPool;
    public readonly api_gatway: apigw.RestApi;

    constructor(scope: cdk.Construct, id: string, props?: CognitoProps) {
      super(scope, id);

      const preSignup = new lambda.Function(this, "createUserPostLambda", {
        functionName: `${props?.prod}-createUserPostLambda`,
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset("lambda/preSignup"),
        handler: "index.handler",
        environment: {
          NEPTUNE_ENDPOINT: props?.neptuneRef.attrEndpoint!
        },
        timeout: cdk.Duration.seconds(10),
        layers: [props?.dependenciesLayer!],
        securityGroups: [props?.sgRef!],
        vpc: props?.vpcRef!,
        vpcSubnets:
        {
          subnetType: ec2.SubnetType.PRIVATE
        }
      });
  
      let userPool;
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
            adminUserPassword: true,
            userSrp: true
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
  
        const api_gatway = new apigw.RestApi(this, 'AuthTestApi', {
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
        
        this.api_gatway = api_gatway;

        new cdk.CfnOutput(this, "API GATEWAY.", {
          value: api_gatway?.url+"login"
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

      const preSignUpLambdaPolicy = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["cognito-idp:ListUsers"],
        resources: ["*"]
      });
      
    preSignup.addToRolePolicy(preSignUpLambdaPolicy)
  

      this.userPool = userPool

    }

}