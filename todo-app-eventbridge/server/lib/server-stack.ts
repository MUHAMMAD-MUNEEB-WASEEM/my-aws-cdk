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
      name: 'cdk-todo-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          
        },
      },
     
    });

    const todoTable = new ddb.Table(this, 'CDKTodoTable', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });

    // DYANAMO AS DS
    const ddbAsDS = api.addDynamoDbDataSource("theTodoTable", todoTable);

    ddbAsDS.createResolver({
      typeName: "Query",
      fieldName: "todos",
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
    const mutations = ["addTodo"]

    mutations.forEach((mut) => {
      let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;

      if (mut === "addTodo") {
        details = `\\\"description\\\":\\\"$ctx.args.todo.description\\\"`;
      }
        // {
        //   details: '$ctx.args.todo.description'
        // }
     
        httpDs.createResolver({
        typeName: "Mutation",
        fieldName: mut,
        requestMappingTemplate: appsync.MappingTemplate.fromString(requestTemplate(details, mut)),
        responseMappingTemplate: appsync.MappingTemplate.fromString(responseTemplate()),
      });
    });

    const todoLambda = new lambda.Function(this, 'AppSyncNotesHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('functions'),
      memorySize: 1024,
      environment: {
        DYNAMO_TABLE_NAME: todoTable.tableName,
      },
    });
    todoTable.grantReadWriteData(todoLambda)
    todoTable.grantFullAccess(todoLambda)

    // RULE
    const rule = new Rule(this, "the-Ruleee", {
      ruleName: "Rulesfortodo",
      eventPattern: {
        source: ["TodoEvents"],
      },
    });

    //adding target 
    rule.addTarget(new targets.LambdaFunction(todoLambda));

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