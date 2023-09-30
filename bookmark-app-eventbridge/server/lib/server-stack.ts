import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from "@aws-cdk/aws-events";
import * as targets from "@aws-cdk/aws-events-targets"
import { Rule } from '@aws-cdk/aws-events';
import { requestTemplate, responseTemplate } from '../request-response';
export class ServerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-bookmark-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          
        },
      },
     
    });

    const bookmarksTable = new ddb.Table(this, 'CDKBookmarksTable', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });

    // DYANAMO AS DS
    const ddbAsDS = api.addDynamoDbDataSource("theBookmarkTable", bookmarksTable);

    ddbAsDS.createResolver({
      typeName: "Query",
      fieldName: "bookmarks",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    })

    // HTTP DATASOURCE
    const httpDs = api.addHttpDataSource(
      "ds",
      "https://events." + this.region + ".amazonaws.com/", // This is the ENDPOINT for eventbridge.
      {
        name: "httpDsWithEventBridge",
        description: "From Appsync to Eventbridge",
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: "events",
        },
      }
    );
    events.EventBus.grantPutEvents(httpDs);

    // RESOLVERS
    // const mutations = ["addBookmark"]

    // mutations.forEach((mut) => {
    //   let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;

    //   if (mut === "addBookmark") {
    //     details = `\\\"title\\\":\\\"$ctx.args.bookmark.title\\\" , \\\"url\\\":\\\"$ctx.args.bookmark.url\\\"`;
    //   }

      httpDs.createResolver({
        typeName: "Mutation",
        fieldName: "addBookmark",
        requestMappingTemplate: appsync.MappingTemplate.fromFile("request.vtl"),
        responseMappingTemplate: appsync.MappingTemplate.fromFile("response.vtl"),
      });

    const bookmarksLambda = new lambda.Function(this, 'AppSyncNotesHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('functions'),
      memorySize: 1024,
      environment: {
        DYNAMO_TABLE_NAME: bookmarksTable.tableName,
      },
    });
    bookmarksTable.grantReadWriteData(bookmarksLambda)
    bookmarksTable.grantFullAccess(bookmarksLambda)

    // RULE
    const rule = new Rule(this, "the-Ruleee", {
      ruleName: "Rulesforbookmark",
      eventPattern: {
        source: ["BookmarkEvents"],
      },
    });

    //adding target 
    rule.addTarget(new targets.LambdaFunction(bookmarksLambda ));





    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region
    });
  }
}