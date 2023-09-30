"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStack = void 0;
const cdk = require("@aws-cdk/core");
const appsync = require("@aws-cdk/aws-appsync");
const ddb = require("@aws-cdk/aws-dynamodb");
const lambda = require("@aws-cdk/aws-lambda");
class ServerStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new appsync.GraphqlApi(this, 'Api', {
            name: 'cdk-todos-appsync-api',
            schema: appsync.Schema.fromAsset('graphql/schema.gql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.API_KEY,
                },
            },
        });
        const todosLambda = new lambda.Function(this, 'AppSyncNotesHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('functions'),
            memorySize: 1024
        });
        const lambdaDs = api.addLambdaDataSource('lambdaDatasource', todosLambda);
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "todos"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "addTodo"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "deleteTodo"
        });
        const todosTable = new ddb.Table(this, 'CDKTodosTable', {
            partitionKey: {
                name: 'id',
                type: ddb.AttributeType.STRING,
            },
        });
        todosTable.grantFullAccess(todosLambda);
        todosLambda.addEnvironment('TODOS_TABLE', todosTable.tableName);
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
exports.ServerStack = ServerStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxnREFBZ0Q7QUFDaEQsNkNBQTZDO0FBQzdDLDhDQUE4QztBQUU5QyxNQUFhLFdBQVksU0FBUSxHQUFHLENBQUMsS0FBSztJQUN4QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBR3hCLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzlDLElBQUksRUFBRSx1QkFBdUI7WUFDN0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1lBQ3RELG1CQUFtQixFQUFFO2dCQUNuQixvQkFBb0IsRUFBRTtvQkFDcEIsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU87aUJBRXJEO2FBQ0Y7U0FFRixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ25FLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN4QyxVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFMUUsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUN0QixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQ3RCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxTQUFTO1NBQ3JCLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxjQUFjLENBQUM7WUFDdEIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFDO1FBS0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdEQsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDL0I7U0FDRixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3ZDLFdBQVcsQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVoRSwwREFBMEQ7UUFDMUQsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdkMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxVQUFVO1NBQ3RCLENBQUMsQ0FBQztRQUVILHlEQUF5RDtRQUN6RCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN2QyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFO1NBQ3hCLENBQUMsQ0FBQztRQUVILDhDQUE4QztRQUM5QyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0QyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkVELGtDQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcclxuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYyc7XHJcbmltcG9ydCAqIGFzIGRkYiBmcm9tICdAYXdzLWNkay9hd3MtZHluYW1vZGInO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcHBzeW5jLkdyYXBocWxBcGkodGhpcywgJ0FwaScsIHtcclxuICAgICAgbmFtZTogJ2Nkay10b2Rvcy1hcHBzeW5jLWFwaScsXHJcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWEuZnJvbUFzc2V0KCdncmFwaHFsL3NjaGVtYS5ncWwnKSxcclxuICAgICAgYXV0aG9yaXphdGlvbkNvbmZpZzoge1xyXG4gICAgICAgIGRlZmF1bHRBdXRob3JpemF0aW9uOiB7XHJcbiAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogYXBwc3luYy5BdXRob3JpemF0aW9uVHlwZS5BUElfS0VZLFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICBcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBjb25zdCB0b2Rvc0xhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0FwcFN5bmNOb3Rlc0hhbmRsZXInLCB7XHJcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxyXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnZnVuY3Rpb25zJyksXHJcbiAgICAgIG1lbW9yeVNpemU6IDEwMjRcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbGFtYmRhRHMgPSBhcGkuYWRkTGFtYmRhRGF0YVNvdXJjZSgnbGFtYmRhRGF0YXNvdXJjZScsIHRvZG9zTGFtYmRhKTtcclxuXHJcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXHJcbiAgICAgIGZpZWxkTmFtZTogXCJ0b2Rvc1wiXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXHJcbiAgICAgIGZpZWxkTmFtZTogXCJhZGRUb2RvXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcclxuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcclxuICAgICAgZmllbGROYW1lOiBcImRlbGV0ZVRvZG9cIlxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgXHJcbiAgICBjb25zdCB0b2Rvc1RhYmxlID0gbmV3IGRkYi5UYWJsZSh0aGlzLCAnQ0RLVG9kb3NUYWJsZScsIHtcclxuICAgICAgcGFydGl0aW9uS2V5OiB7XHJcbiAgICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgICB0eXBlOiBkZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRvZG9zVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHRvZG9zTGFtYmRhKVxyXG4gICAgdG9kb3NMYW1iZGEuYWRkRW52aXJvbm1lbnQoJ1RPRE9TX1RBQkxFJywgdG9kb3NUYWJsZS50YWJsZU5hbWUpO1xyXG5cclxuICAgIC8vIFByaW50cyBvdXQgdGhlIEFwcFN5bmMgR3JhcGhRTCBlbmRwb2ludCB0byB0aGUgdGVybWluYWxcclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiR3JhcGhRTEFQSVVSTFwiLCB7XHJcbiAgICAgIHZhbHVlOiBhcGkuZ3JhcGhxbFVybFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUHJpbnRzIG91dCB0aGUgQXBwU3luYyBHcmFwaFFMIEFQSSBrZXkgdG8gdGhlIHRlcm1pbmFsXHJcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIkdyYXBoUUxBUElLZXlcIiwge1xyXG4gICAgICB2YWx1ZTogYXBpLmFwaUtleSB8fCAnJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUHJpbnRzIG91dCB0aGUgc3RhY2sgcmVnaW9uIHRvIHRoZSB0ZXJtaW5hbFxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJTdGFjayBSZWdpb25cIiwge1xyXG4gICAgICB2YWx1ZTogdGhpcy5yZWdpb25cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=