import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as apigw from '@aws-cdk/aws-apigateway';
import { Secret } from '@aws-cdk/aws-secretsmanager';
import {VPCNeptune} from "./VPC-Neptune-constructs/VPC-Neptune";
import {CognitoPool} from "./Cognito-Constructs/cognito-pool";
import { AppsyncApi } from './Appsync-api-Constructs/appsync-api';

interface EnvProps {
  prod: string;
}

export class NeptuneApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: EnvProps) {
    super(scope, id);

    // The code that defines your stack goes here

    const vpcNeptune = new VPCNeptune(this, "VPCNeptuneCluster", {
      prod: props?.prod!
    })

    const dependenciesLayer = new lambda.LayerVersion(this, "dependencies", {
      layerVersionName: "Dependencies",
      code: lambda.Code.fromAsset("lambda-layer"),
    });

    const cognito_pool = new CognitoPool(this, "CognitoPool", {
      dependenciesLayer: dependenciesLayer,
      prod: props?.prod!,
      neptuneRef: vpcNeptune.NeptuneRef,
      sgRef: vpcNeptune.SGRef,
      vpcRef: vpcNeptune.VPCRef
    })


    const appsync_api = new AppsyncApi(this, "AppSyncApi", {
      dependenciesLayer: dependenciesLayer,
      prod: props?.prod!,
      neptuneRef: vpcNeptune.NeptuneRef,
      sgRef: vpcNeptune.SGRef,
      vpcRef: vpcNeptune.VPCRef,
      userPool: cognito_pool.userPool
    })


    if(props?.prod == 'test'){
      const secret = new Secret(this, 'Secret', {
        description: "My Api Url",
        secretName: 'api_info',
        generateSecretString: {
          secretStringTemplate: JSON.stringify({'url' : appsync_api.api.graphqlUrl, 'api_key': appsync_api.api.apiKey, "login_url": cognito_pool.api_gatway?.url+"login", "signup_url": cognito_pool.api_gatway?.url+"signup"}),
          generateStringKey: 'apiUrl',
        }
      });
    }

    const handler = new lambda.Function(this, "Lambda", {
      functionName: `staticData-handler`,
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("lambda/staticDataHandler"),
      handler: "index.handler",
      securityGroups: [vpcNeptune.SGRef],
      vpc: vpcNeptune.VPCRef!,
      environment:{
        NEPTUNE_ENDPOINT:vpcNeptune.NeptuneEndPoint
      },
      vpcSubnets:
      {
      subnetType: ec2.SubnetType.ISOLATED
      },
      timeout:cdk.Duration.seconds(100)
    });

    const api = new apigw.LambdaRestApi(this,"Static-Data-api",{
      handler: handler
    }) 


  }
}