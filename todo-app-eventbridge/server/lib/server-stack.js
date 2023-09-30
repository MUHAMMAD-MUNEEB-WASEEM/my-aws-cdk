"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStack = void 0;
const cdk = require("@aws-cdk/core");
const appsync = require("@aws-cdk/aws-appsync");
const ddb = require("@aws-cdk/aws-dynamodb");
const lambda = require("@aws-cdk/aws-lambda");
const events = require("@aws-cdk/aws-events");
const targets = require("@aws-cdk/aws-events-targets");
const aws_events_1 = require("@aws-cdk/aws-events");
const request_response_1 = require("../request-response");
class ServerStack extends cdk.Stack {
    constructor(scope, id, props) {
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
        });
        // HTTP DATASOURCE
        const httpDs = api.addHttpDataSource("ds", "https://events." + this.region + ".amazonaws.com/", // This is the ENDPOINT for eventbridge.
        {
            name: "httpDsWithEventBridge",
            description: "From Appsync to Eventbridge",
            authorizationConfig: {
                signingRegion: this.region,
                signingServiceName: "events",
            },
        });
        events.EventBus.grantPutEvents(httpDs);
        // RESOLVERS
        const mutations = ["addTodo"];
        mutations.forEach((mut) => {
            let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;
            if (mut === "addTodo") {
                details = `\\\"description\\\":\\\"$ctx.args.todo.description\\\"`;
            }
            httpDs.createResolver({
                typeName: "Mutation",
                fieldName: mut,
                requestMappingTemplate: appsync.MappingTemplate.fromString(request_response_1.requestTemplate(details, mut)),
                responseMappingTemplate: appsync.MappingTemplate.fromString(request_response_1.responseTemplate()),
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
        todoTable.grantReadWriteData(todoLambda);
        todoTable.grantFullAccess(todoLambda);
        // RULE
        const rule = new aws_events_1.Rule(this, "the-Ruleee", {
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
exports.ServerStack = ServerStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxnREFBZ0Q7QUFDaEQsNkNBQTZDO0FBQzdDLDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELG9EQUEyQztBQUMzQywwREFBd0U7QUFDeEUsTUFBYSxXQUFZLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDeEMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUd4QixNQUFNLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUM5QyxJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQztZQUN0RCxtQkFBbUIsRUFBRTtnQkFDbkIsb0JBQW9CLEVBQUU7b0JBQ3BCLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO2lCQUVyRDthQUNGO1NBRUYsQ0FBQyxDQUFDO1FBRUgsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDcEQsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDL0I7U0FDRixDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyRSxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFB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Q0FBQyxNQUFNO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXpHRCxrQ0F5R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XHJcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMnO1xyXG5pbXBvcnQgKiBhcyBkZGIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJztcclxuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xyXG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSBcIkBhd3MtY2RrL2F3cy1ldmVudHNcIjtcclxuaW1wb3J0ICogYXMgdGFyZ2V0cyBmcm9tIFwiQGF3cy1jZGsvYXdzLWV2ZW50cy10YXJnZXRzXCJcclxuaW1wb3J0IHsgUnVsZSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1ldmVudHMnO1xyXG5pbXBvcnQgeyByZXF1ZXN0VGVtcGxhdGUsIHJlc3BvbnNlVGVtcGxhdGUgfSBmcm9tICcuLi9yZXF1ZXN0LXJlc3BvbnNlJztcclxuZXhwb3J0IGNsYXNzIFNlcnZlclN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgXHJcbiAgICBjb25zdCBhcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsICdBcGknLCB7XHJcbiAgICAgIG5hbWU6ICdjZGstdG9kby1hcHBzeW5jLWFwaScsXHJcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWEuZnJvbUFzc2V0KCdncmFwaHFsL3NjaGVtYS5ncWwnKSxcclxuICAgICAgYXV0aG9yaXphdGlvbkNvbmZpZzoge1xyXG4gICAgICAgIGRlZmF1bHRBdXRob3JpemF0aW9uOiB7XHJcbiAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogYXBwc3luYy5BdXRob3JpemF0aW9uVHlwZS5BUElfS0VZLFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRvZG9UYWJsZSA9IG5ldyBkZGIuVGFibGUodGhpcywgJ0NES1RvZG9UYWJsZScsIHtcclxuICAgICAgcGFydGl0aW9uS2V5OiB7XHJcbiAgICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgICB0eXBlOiBkZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBEWUFOQU1PIEFTIERTXHJcbiAgICBjb25zdCBkZGJBc0RTID0gYXBpLmFkZER5bmFtb0RiRGF0YVNvdXJjZShcInRoZVRvZG9UYWJsZVwiLCB0b2RvVGFibGUpO1xyXG5cclxuICAgIGRkYkFzRFMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxyXG4gICAgICBmaWVsZE5hbWU6IFwidG9kb3NcIixcclxuICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJTY2FuVGFibGUoKSxcclxuICAgICAgcmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmR5bmFtb0RiUmVzdWx0TGlzdCgpLFxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIVFRQIERBVEFTT1VSQ0VcclxuICAgIGNvbnN0IGh0dHBEcyA9IGFwaS5hZGRIdHRwRGF0YVNvdXJjZShcclxuICAgICAgXCJkc1wiLFxyXG4gICAgICBcImh0dHBzOi8vZXZlbnRzLlwiICsgdGhpcy5yZWdpb24gKyBcIi5hbWF6b25hd3MuY29tL1wiLCAvLyBUaGlzIGlzIHRoZSBFTkRQT0lOVCBmb3IgZXZlbnRicmlkZ2UuXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcImh0dHBEc1dpdGhFdmVudEJyaWRnZVwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkZyb20gQXBwc3luYyB0byBFdmVudGJyaWRnZVwiLFxyXG4gICAgICAgIGF1dGhvcml6YXRpb25Db25maWc6IHtcclxuICAgICAgICAgIHNpZ25pbmdSZWdpb246IHRoaXMucmVnaW9uLFxyXG4gICAgICAgICAgc2lnbmluZ1NlcnZpY2VOYW1lOiBcImV2ZW50c1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBldmVudHMuRXZlbnRCdXMuZ3JhbnRQdXRFdmVudHMoaHR0cERzKTtcclxuXHJcbiAgICAvLyBSRVNPTFZFUlNcclxuICAgIGNvbnN0IG11dGF0aW9ucyA9IFtcImFkZFRvZG9cIl1cclxuXHJcbiAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0KSA9PiB7XHJcbiAgICAgIGxldCBkZXRhaWxzID0gYFxcXFxcXFwiaWRcXFxcXFxcIjogXFxcXFxcXCIkY3R4LmFyZ3MuaWRcXFxcXFxcImA7XHJcblxyXG4gICAgICBpZiAobXV0ID09PSBcImFkZFRvZG9cIikge1xyXG4gICAgICAgIGRldGFpbHMgPSBgXFxcXFxcXCJkZXNjcmlwdGlvblxcXFxcXFwiOlxcXFxcXFwiJGN0eC5hcmdzLnRvZG8uZGVzY3JpcHRpb25cXFxcXFxcImA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGh0dHBEcy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcclxuICAgICAgICBmaWVsZE5hbWU6IG11dCxcclxuICAgICAgICByZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5mcm9tU3RyaW5nKHJlcXVlc3RUZW1wbGF0ZShkZXRhaWxzLCBtdXQpKSxcclxuICAgICAgICByZXNwb25zZU1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbVN0cmluZyhyZXNwb25zZVRlbXBsYXRlKCkpLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRvZG9MYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdBcHBTeW5jTm90ZXNIYW5kbGVyJywge1xyXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcclxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxyXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2Z1bmN0aW9ucycpLFxyXG4gICAgICBtZW1vcnlTaXplOiAxMDI0LFxyXG4gICAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICAgIERZTkFNT19UQUJMRV9OQU1FOiB0b2RvVGFibGUudGFibGVOYW1lLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICB0b2RvVGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRvZG9MYW1iZGEpXHJcbiAgICB0b2RvVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHRvZG9MYW1iZGEpXHJcblxyXG4gICAgLy8gUlVMRVxyXG4gICAgY29uc3QgcnVsZSA9IG5ldyBSdWxlKHRoaXMsIFwidGhlLVJ1bGVlZVwiLCB7XHJcbiAgICAgIHJ1bGVOYW1lOiBcIlJ1bGVzZm9ydG9kb1wiLFxyXG4gICAgICBldmVudFBhdHRlcm46IHtcclxuICAgICAgICBzb3VyY2U6IFtcIlRvZG9FdmVudHNcIl0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FkZGluZyB0YXJnZXQgXHJcbiAgICBydWxlLmFkZFRhcmdldChuZXcgdGFyZ2V0cy5MYW1iZGFGdW5jdGlvbih0b2RvTGFtYmRhKSk7XHJcblxyXG4gICAgLy8gUHJpbnRzIG91dCB0aGUgQXBwU3luYyBHcmFwaFFMIGVuZHBvaW50IHRvIHRoZSB0ZXJtaW5hbFxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJHcmFwaFFMQVBJVVJMXCIsIHtcclxuICAgICAgdmFsdWU6IGFwaS5ncmFwaHFsVXJsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBQcmludHMgb3V0IHRoZSBBcHBTeW5jIEdyYXBoUUwgQVBJIGtleSB0byB0aGUgdGVybWluYWxcclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiR3JhcGhRTEFQSUtleVwiLCB7XHJcbiAgICAgIHZhbHVlOiBhcGkuYXBpS2V5IHx8ICcnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBQcmludHMgb3V0IHRoZSBzdGFjayByZWdpb24gdG8gdGhlIHRlcm1pbmFsXHJcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIlN0YWNrIFJlZ2lvblwiLCB7XHJcbiAgICAgIHZhbHVlOiB0aGlzLnJlZ2lvblxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19