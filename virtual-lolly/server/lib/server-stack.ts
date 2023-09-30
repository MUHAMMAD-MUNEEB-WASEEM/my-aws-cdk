import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class ServerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-lollies-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          
        },
      },
     
    });
    
    const lolliesLambda = new lambda.Function(this, 'AppSyncNotesHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('functions'),
      memorySize: 1024
    });
    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', lolliesLambda );

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getLollies"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addLolly"
    });

    const lolliesTable = new ddb.Table(this, 'CDKLolliesTable', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING,
      },
    });
    lolliesTable.grantFullAccess(lolliesLambda)
    lolliesLambda.addEnvironment('LOLLY_TABLE', lolliesTable.tableName);

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