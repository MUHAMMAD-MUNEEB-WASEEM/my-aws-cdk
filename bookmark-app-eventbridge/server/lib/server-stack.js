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
class ServerStack extends cdk.Stack {
    constructor(scope, id, props) {
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
        bookmarksTable.grantReadWriteData(bookmarksLambda);
        bookmarksTable.grantFullAccess(bookmarksLambda);
        // RULE
        const rule = new aws_events_1.Rule(this, "the-Ruleee", {
            ruleName: "Rulesforbookmark",
            eventPattern: {
                source: ["BookmarkEvents"],
            },
        });
        //adding target 
        rule.addTarget(new targets.LambdaFunction(bookmarksLambda));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxnREFBZ0Q7QUFDaEQsNkNBQTZDO0FBQzdDLDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsdURBQXNEO0FBQ3RELG9EQUEyQztBQUUzQyxNQUFhLFdBQVksU0FBUSxHQUFHLENBQUMsS0FBSztJQUN4QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBR3hCLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzlDLElBQUksRUFBRSwwQkFBMEI7WUFDaEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1lBQ3RELG1CQUFtQixFQUFFO2dCQUNuQixvQkFBb0IsRUFBRTtvQkFDcEIsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU87aUJBRXJEO2FBQ0Y7U0FFRixDQUFDLENBQUM7UUFFSCxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzlELFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQy9CO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUU5RSxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUU7WUFDbkUsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRTtTQUN0RSxDQUFDLENBQUE7UUFFRixrQkFBa0I7UUFDbEIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUNsQyxJQUFJLEVBQ0osaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsRUFBRSx3Q0FBd0M7UUFDN0Y7WUFDRSxJQUFJLEVBQUUsdUJBQXVCO1lBQzdCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsbUJBQW1CLEVBQUU7Z0JBQ25CLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDMUIsa0JBQWtCLEVBQUUsUUFBUTthQUM3QjtTQUNGLENBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZDLFlBQVk7UUFDWixvQ0FBb0M7UUFFcEMsK0JBQStCO1FBQy9CLHNEQUFzRDtRQUV0RCxpQ0FBaUM7UUFDakMsK0dBQStHO1FBQy9HLE1BQU07UUFFSixNQUFNLENBQUMsY0FBYyxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUN2RSx1QkFBdUIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7U0FDMUUsQ0FBQyxDQUFDO1FBRUwsTUFBTSxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUN2RSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDeEMsVUFBVSxFQUFFLElBQUk7WUFDaEIsV0FBVyxFQUFFO2dCQUNYLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxTQUFTO2FBQzVDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsY0FBYyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ2xELGNBQWMsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUE7UUFFL0MsT0FBTztRQUNQLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3hDLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsWUFBWSxFQUFFO2dCQUNaLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQzNCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBRSxDQUFDLENBQUM7UUFNN0QsMERBQTBEO1FBQzFELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3ZDLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFFSCx5REFBeUQ7UUFDekQsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdkMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRTtTQUN4QixDQUFDLENBQUM7UUFFSCw4Q0FBOEM7UUFDOUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDdEMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTVHRCxrQ0E0R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XHJcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMnO1xyXG5pbXBvcnQgKiBhcyBkZGIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJztcclxuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xyXG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSBcIkBhd3MtY2RrL2F3cy1ldmVudHNcIjtcclxuaW1wb3J0ICogYXMgdGFyZ2V0cyBmcm9tIFwiQGF3cy1jZGsvYXdzLWV2ZW50cy10YXJnZXRzXCJcclxuaW1wb3J0IHsgUnVsZSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1ldmVudHMnO1xyXG5pbXBvcnQgeyByZXF1ZXN0VGVtcGxhdGUsIHJlc3BvbnNlVGVtcGxhdGUgfSBmcm9tICcuLi9yZXF1ZXN0LXJlc3BvbnNlJztcclxuZXhwb3J0IGNsYXNzIFNlcnZlclN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgXHJcbiAgICBjb25zdCBhcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsICdBcGknLCB7XHJcbiAgICAgIG5hbWU6ICdjZGstYm9va21hcmstYXBwc3luYy1hcGknLFxyXG4gICAgICBzY2hlbWE6IGFwcHN5bmMuU2NoZW1hLmZyb21Bc3NldCgnZ3JhcGhxbC9zY2hlbWEuZ3FsJyksXHJcbiAgICAgIGF1dGhvcml6YXRpb25Db25maWc6IHtcclxuICAgICAgICBkZWZhdWx0QXV0aG9yaXphdGlvbjoge1xyXG4gICAgICAgICAgYXV0aG9yaXphdGlvblR5cGU6IGFwcHN5bmMuQXV0aG9yaXphdGlvblR5cGUuQVBJX0tFWSxcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBib29rbWFya3NUYWJsZSA9IG5ldyBkZGIuVGFibGUodGhpcywgJ0NES0Jvb2ttYXJrc1RhYmxlJywge1xyXG4gICAgICBwYXJ0aXRpb25LZXk6IHtcclxuICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgIHR5cGU6IGRkYi5BdHRyaWJ1dGVUeXBlLlNUUklORyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIERZQU5BTU8gQVMgRFNcclxuICAgIGNvbnN0IGRkYkFzRFMgPSBhcGkuYWRkRHluYW1vRGJEYXRhU291cmNlKFwidGhlQm9va21hcmtUYWJsZVwiLCBib29rbWFya3NUYWJsZSk7XHJcblxyXG4gICAgZGRiQXNEUy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXHJcbiAgICAgIGZpZWxkTmFtZTogXCJib29rbWFya3NcIixcclxuICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZHluYW1vRGJTY2FuVGFibGUoKSxcclxuICAgICAgcmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmR5bmFtb0RiUmVzdWx0TGlzdCgpLFxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIVFRQIERBVEFTT1VSQ0VcclxuICAgIGNvbnN0IGh0dHBEcyA9IGFwaS5hZGRIdHRwRGF0YVNvdXJjZShcclxuICAgICAgXCJkc1wiLFxyXG4gICAgICBcImh0dHBzOi8vZXZlbnRzLlwiICsgdGhpcy5yZWdpb24gKyBcIi5hbWF6b25hd3MuY29tL1wiLCAvLyBUaGlzIGlzIHRoZSBFTkRQT0lOVCBmb3IgZXZlbnRicmlkZ2UuXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcImh0dHBEc1dpdGhFdmVudEJyaWRnZVwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkZyb20gQXBwc3luYyB0byBFdmVudGJyaWRnZVwiLFxyXG4gICAgICAgIGF1dGhvcml6YXRpb25Db25maWc6IHtcclxuICAgICAgICAgIHNpZ25pbmdSZWdpb246IHRoaXMucmVnaW9uLFxyXG4gICAgICAgICAgc2lnbmluZ1NlcnZpY2VOYW1lOiBcImV2ZW50c1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBldmVudHMuRXZlbnRCdXMuZ3JhbnRQdXRFdmVudHMoaHR0cERzKTtcclxuXHJcbiAgICAvLyBSRVNPTFZFUlNcclxuICAgIC8vIGNvbnN0IG11dGF0aW9ucyA9IFtcImFkZEJvb2ttYXJrXCJdXHJcblxyXG4gICAgLy8gbXV0YXRpb25zLmZvckVhY2goKG11dCkgPT4ge1xyXG4gICAgLy8gICBsZXQgZGV0YWlscyA9IGBcXFxcXFxcImlkXFxcXFxcXCI6IFxcXFxcXFwiJGN0eC5hcmdzLmlkXFxcXFxcXCJgO1xyXG5cclxuICAgIC8vICAgaWYgKG11dCA9PT0gXCJhZGRCb29rbWFya1wiKSB7XHJcbiAgICAvLyAgICAgZGV0YWlscyA9IGBcXFxcXFxcInRpdGxlXFxcXFxcXCI6XFxcXFxcXCIkY3R4LmFyZ3MuYm9va21hcmsudGl0bGVcXFxcXFxcIiAsIFxcXFxcXFwidXJsXFxcXFxcXCI6XFxcXFxcXCIkY3R4LmFyZ3MuYm9va21hcmsudXJsXFxcXFxcXCJgO1xyXG4gICAgLy8gICB9XHJcblxyXG4gICAgICBodHRwRHMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXHJcbiAgICAgICAgZmllbGROYW1lOiBcImFkZEJvb2ttYXJrXCIsXHJcbiAgICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXCJyZXF1ZXN0LnZ0bFwiKSxcclxuICAgICAgICByZXNwb25zZU1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXCJyZXNwb25zZS52dGxcIiksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGJvb2ttYXJrc0xhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0FwcFN5bmNOb3Rlc0hhbmRsZXInLCB7XHJcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxyXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXHJcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnZnVuY3Rpb25zJyksXHJcbiAgICAgIG1lbW9yeVNpemU6IDEwMjQsXHJcbiAgICAgIGVudmlyb25tZW50OiB7XHJcbiAgICAgICAgRFlOQU1PX1RBQkxFX05BTUU6IGJvb2ttYXJrc1RhYmxlLnRhYmxlTmFtZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgYm9va21hcmtzVGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKGJvb2ttYXJrc0xhbWJkYSlcclxuICAgIGJvb2ttYXJrc1RhYmxlLmdyYW50RnVsbEFjY2Vzcyhib29rbWFya3NMYW1iZGEpXHJcblxyXG4gICAgLy8gUlVMRVxyXG4gICAgY29uc3QgcnVsZSA9IG5ldyBSdWxlKHRoaXMsIFwidGhlLVJ1bGVlZVwiLCB7XHJcbiAgICAgIHJ1bGVOYW1lOiBcIlJ1bGVzZm9yYm9va21hcmtcIixcclxuICAgICAgZXZlbnRQYXR0ZXJuOiB7XHJcbiAgICAgICAgc291cmNlOiBbXCJCb29rbWFya0V2ZW50c1wiXSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYWRkaW5nIHRhcmdldCBcclxuICAgIHJ1bGUuYWRkVGFyZ2V0KG5ldyB0YXJnZXRzLkxhbWJkYUZ1bmN0aW9uKGJvb2ttYXJrc0xhbWJkYSApKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gUHJpbnRzIG91dCB0aGUgQXBwU3luYyBHcmFwaFFMIGVuZHBvaW50IHRvIHRoZSB0ZXJtaW5hbFxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJHcmFwaFFMQVBJVVJMXCIsIHtcclxuICAgICAgdmFsdWU6IGFwaS5ncmFwaHFsVXJsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBQcmludHMgb3V0IHRoZSBBcHBTeW5jIEdyYXBoUUwgQVBJIGtleSB0byB0aGUgdGVybWluYWxcclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiR3JhcGhRTEFQSUtleVwiLCB7XHJcbiAgICAgIHZhbHVlOiBhcGkuYXBpS2V5IHx8ICcnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBQcmludHMgb3V0IHRoZSBzdGFjayByZWdpb24gdG8gdGhlIHRlcm1pbmFsXHJcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIlN0YWNrIFJlZ2lvblwiLCB7XHJcbiAgICAgIHZhbHVlOiB0aGlzLnJlZ2lvblxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19