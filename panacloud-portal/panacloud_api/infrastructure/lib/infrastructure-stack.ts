import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as iam from "@aws-cdk/aws-iam";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cognito from "@aws-cdk/aws-cognito";
import * as path from "path";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const JWT_SIGNING_SECRET = "PANACLOUD_SECRET";

    const dependenciesLayer = new lambda.LayerVersion(this, "dependencies", {
      layerVersionName: "onboardingDependencies",

      code: lambda.Code.fromAsset(
        path.join(__dirname, "/../../runtime/", "lambdaLayers")
      ),
    });

    const masterTable = new dynamodb.Table(this, "masterTable", {
      tableName: "masterTable",
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });
    masterTable.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "pk1", type: dynamodb.AttributeType.STRING },
    });

    masterTable.addGlobalSecondaryIndex({
      indexName: "sk-index",
      partitionKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "pk", type: dynamodb.AttributeType.STRING },
    });

    const api = new appsync.GraphqlApi(this, "onBoardingAPI", {
      name: "tenantOnboarding",
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: "onboardingAPIKey",
          },
        },
      },
      schema: appsync.Schema.fromAsset("schema/schema.graphql"),
    });

    const lambdaPolicy = new iam.PolicyStatement({
      resources: ["*"],
      actions: ["cognito-idp:*", "dynamodb:*", "appsync:*", "events:*"],
    });

    const createApiFn = new lambda.Function(this, "createApiFn", {
      functionName: "createApiFn",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(
        path.join(__dirname, "/../../runtime/", "lambda")
      ),
      handler: "createApi.handler",
      memorySize: 1024,
      layers: [dependenciesLayer],
    });
    createApiFn.addToRolePolicy(lambdaPolicy);
    createApiFn.addEnvironment("TENANT_TABLE", masterTable.tableName);

    const createApiDs = api.addLambdaDataSource("createApiDs", createApiFn);
    createApiDs.createResolver({
      typeName: "Mutation",
      fieldName: "createApi",
    });

    const publishApiFn = new lambda.Function(this, "publishApiFn", {
      functionName: "publishApiFn",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(
        path.join(__dirname, "/../../runtime/", "lambda")
      ),
      handler: "publishApi.handler",
      memorySize: 1024,
      layers: [dependenciesLayer],
    });
    publishApiFn.addToRolePolicy(lambdaPolicy);
    publishApiFn.addEnvironment("TENANT_TABLE", masterTable.tableName);

    const publishApiDs = api.addLambdaDataSource("publishApiDs", publishApiFn);
    publishApiDs.createResolver({
      typeName: "Mutation",
      fieldName: "publishApi",
    });

    const createDevApiFn = new lambda.Function(this, "createDevApiFn", {
      functionName: "createDevApiFn",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(
        path.join(__dirname, "/../../runtime/", "lambda")
      ),
      handler: "createDevApi.handler",
      memorySize: 1024,
      layers: [dependenciesLayer],
    });
    createDevApiFn.addToRolePolicy(lambdaPolicy);
    createDevApiFn.addEnvironment("TENANT_TABLE", masterTable.tableName);

    const createDevApiDs = api.addLambdaDataSource(
      "createDevApiDs",
      createDevApiFn
    );
    createDevApiDs.createResolver({
      typeName: "Mutation",
      fieldName: "createDevApi",
    });

    const fetchSubscriptionsFn = new lambda.Function(
      this,
      "fetchSubscriptionsFn",
      {
        functionName: "fetchSubscriptionsFn",
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset(
          path.join(__dirname, "/../../runtime/", "lambda")
        ),
        handler: "fetchSubscriptionsWithDetails.handler",
        memorySize: 1024,
        layers: [dependenciesLayer],
      }
    );
    fetchSubscriptionsFn.addToRolePolicy(lambdaPolicy);
    fetchSubscriptionsFn.addEnvironment("TENANT_TABLE", masterTable.tableName);

    const fetchSubscriptionsDs = api.addLambdaDataSource(
      "fetchSubscriptionsDs",
      fetchSubscriptionsFn
    );
    fetchSubscriptionsDs.createResolver({
      typeName: "Query",
      fieldName: "fetchSubscriptionsWithDetails",
    });

    const subscribeToApiFn = new lambda.Function(this, "subscribeToApiFn", {
      functionName: "subscribeToApiFn",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(
        path.join(__dirname, "/../../runtime/", "lambda")
      ),
      handler: "subscribeToApi.handler",
      memorySize: 1024,
      layers: [dependenciesLayer],
    });
    subscribeToApiFn.addToRolePolicy(lambdaPolicy);
    subscribeToApiFn.addEnvironment("TENANT_TABLE", masterTable.tableName);
    subscribeToApiFn.addEnvironment("mySecret", JWT_SIGNING_SECRET);

    const subscribeToApiDs = api.addLambdaDataSource(
      "subscribeToApiDs",
      subscribeToApiFn
    );
    subscribeToApiDs.createResolver({
      typeName: "Mutation",
      fieldName: "subscribeToApi",
    });

    // We CHANGED THIS NAME
    const masterTableDs = api.addDynamoDbDataSource(
      "fetchPublicApisDs",
      masterTable
    );

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchAllPublicApis",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version" : "2017-02-28",
           "operation" : "Query",
           "index" : "GSI1",
           "query" : {
             "expression" : "#pk1 = :PUBLIC",
             "expressionNames" : {
                "#pk1" : "pk1"
              },
             "expressionValues" : {
                ":PUBLIC" : $util.dynamodb.toDynamoDBJson("PUBLIC")
        }
    }}`),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "getTokenForKey",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
      {"version" : "2017-02-28", "operation" : "Query", "index" : "GSI1", "query" : {
        "expression" : "#pk1 = :apiKey",
        "expressionNames" : {
            "#pk1" : "pk1"
        },
        "expressionValues" : {
            ":apiKey" : $util.dynamodb.toDynamoDBJson("APIKEY#$ctx.args.apiKey")
        }
    }}`),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });
    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchApiDetails",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
      {
        "version": "2017-02-28",
        "operation": "GetItem",
        "key": {
            "pk": $util.dynamodb.toDynamoDBJson($ctx.args.apiId),
            "sk": $util.dynamodb.toDynamoDBJson("A")
        }
      }
      `),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchDevDetails",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
      {
        "version": "2017-02-28",
        "operation": "GetItem",
        "key": {
            "pk": $util.dynamodb.toDynamoDBJson($ctx.args.devId),
            "sk": $util.dynamodb.toDynamoDBJson("A")
        }
      }
      `),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchAllUnderdevelopmentApis",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version" : "2017-02-28",
           "operation" : "Query",
           "index" : "GSI1",
           "query" : {
             "expression" : "#pk1 = :DEV",
             "expressionNames" : {
                "#pk1" : "pk1"
              },
             "expressionValues" : {
                ":DEV" : $util.dynamodb.toDynamoDBJson("DEV")
        }
    }}`),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchUnderdevelopmentApisForDev",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version" : "2017-02-28",
           "operation" : "Query",
           "index" : "GSI1",
           "filter" : {
            "expression" : "created_by = :devId",
            "expressionValues" : {
                ":devId" : $util.dynamodb.toDynamoDBJson($ctx.args.devId)
            }
        },
           "query" : {
             "expression" : "#pk1 = :DEV",
             "expressionNames" : {
                "#pk1" : "pk1"
              },
             "expressionValues" : {
                ":DEV" : $util.dynamodb.toDynamoDBJson("DEV")
        }
    }}`),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchCreatedApis",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version" : "2017-02-28",
           "operation" : "Query",
           "query" : {
             "expression" : "pk = :devId AND (begins_with(sk,:C))",
             "expressionValues" : {
                ":devId" : $util.dynamodb.toDynamoDBJson($ctx.args.devId),
                ":C" : $util.dynamodb.toDynamoDBJson("C:")
        }
    }}`),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchSubscriptions",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version" : "2017-02-28",
           "operation" : "Query",
           "query" : {
             "expression" : "pk = :devId AND (begins_with(sk,:S))",
             "expressionValues" : {
                ":devId" : $util.dynamodb.toDynamoDBJson($ctx.args.devId),
                ":S" : $util.dynamodb.toDynamoDBJson("S:")
        }
    }}`),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchSubscribers",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version" : "2017-02-28",
           "operation" : "Query",
           "index": "sk-index",
           "query" : {
             "expression" : "sk = :sk",
             "expressionValues" : {
                ":sk" : $util.dynamodb.toDynamoDBJson("S:$ctx.args.apiId"),
        }
    }}`),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    masterTableDs.createResolver({
      typeName: "Query",
      fieldName: "fetchPublishedApisForDev",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
      {
        "version" : "2017-02-28",
         "operation" : "Query",
         "index" : "GSI1",
         "filter" : {
          "expression" : "created_by = :devId",
          "expressionValues" : {
              ":devId" : $util.dynamodb.toDynamoDBJson($ctx.args.devId)
          }
      },
         "query" : {
           "expression" : "#pk1 = :PUBLIC",
           "expressionNames" : {
              "#pk1" : "pk1"
            },
           "expressionValues" : {
              ":PUBLIC" : $util.dynamodb.toDynamoDBJson("PUBLIC")
      }
  }}`),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });
    const devUserPool = new cognito.UserPool(this, "devUserPool", {
      userPoolName: "devUserPool",
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        fullname: {
          required: true,
          mutable: true,
        },
        phoneNumber: {
          required: true,
          mutable: true,
        },
        profilePicture: {
          required: false,
          mutable: true,
        },
        address: {
          required: true,
          mutable: true,
        },
      },
    });

    const postConfirmationFn = new lambda.Function(
      this,
      "postConfirmationLambda",
      {
        functionName: "postConfirmationLambda",
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset(
          path.join(__dirname, "/../../runtime/", "lambda")
        ),
        handler: "postConfirmation.handler",
        layers: [dependenciesLayer],
        memorySize: 1024,
        environment: { TENANT_TABLE: masterTable.tableName },
      }
    );

    devUserPool.addTrigger(
      cognito.UserPoolOperation.POST_CONFIRMATION,
      postConfirmationFn
    );

    const userPoolClient = new cognito.UserPoolClient(this, "userPoolClient", {
      userPool: devUserPool,
    });

    masterTable.grantFullAccess(postConfirmationFn);
    postConfirmationFn.addToRolePolicy(
      new iam.PolicyStatement({
        resources: ["*"],
        actions: ["events:*"],
      })
    );
    new cdk.CfnOutput(this, "UserPoolId", {
      value: devUserPool.userPoolId,
    });

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}
