"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsyncNeptuneStack = void 0;
const cdk = require("@aws-cdk/core");
const appsync = require("@aws-cdk/aws-appsync");
const lambda = require("@aws-cdk/aws-lambda");
const ec2 = require("@aws-cdk/aws-ec2");
const neptune = require("@aws-cdk/aws-neptune");
class AppsyncNeptuneStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new appsync.GraphqlApi(this, 'Api', {
            name: 'NeptuneAPI',
            schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.API_KEY
                },
            },
        });
        const vpc = new ec2.Vpc(this, 'NewNeptuneVPC');
        const lambdaFn = new lambda.Function(this, 'Lambda Function', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'main.handler',
            code: lambda.Code.fromAsset('lambda-fns'),
            memorySize: 1024,
            vpc
        });
        // set the new Lambda function as a data source for the AppSync API
        const lambdaDs = api.addLambdaDataSource('lambdaDatasource', lambdaFn);
        //Query
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "userFriendList"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "friendofFriend"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "recommendByFriend"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "restaurantRatedByFriend"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "restaurantBycuisine"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "newestReview"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "nearestHRRestaurant"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "pastXDays"
        });
        //test queries resovler
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "getReview"
        });
        lambdaDs.createResolver({
            typeName: "Query",
            fieldName: "getRestaurant"
        });
        //Vertices
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "addUser"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "addReviews"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "addRestaurant"
        });
        //Edges
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "createFriendShip"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "addReview"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "recommendRestaurant"
        });
        lambdaDs.createResolver({
            typeName: "Mutation",
            fieldName: "about"
        });
        const cluster = new neptune.DatabaseCluster(this, 'NeptuneCluster', {
            vpc,
            instanceType: neptune.InstanceType.T3_MEDIUM
        });
        cluster.connections.allowDefaultPortFromAnyIpv4('Open to the world');
        const writeAddress = cluster.clusterEndpoint.socketAddress;
        new cdk.CfnOutput(this, 'writeaddress', {
            value: writeAddress
        });
        const readAddress = cluster.clusterReadEndpoint.socketAddress;
        new cdk.CfnOutput(this, 'readaddress', {
            value: readAddress
        });
        lambdaFn.addEnvironment('WRITER', writeAddress);
        lambdaFn.addEnvironment('READER', readAddress);
    }
}
exports.AppsyncNeptuneStack = AppsyncNeptuneStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwc3luYy1uZXB0dW5lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwc3luYy1uZXB0dW5lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLHdDQUF3QztBQUN4QyxnREFBZ0Q7QUFFaEQsTUFBYSxtQkFBb0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNoRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzlDLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQztZQUMxRCxtQkFBbUIsRUFBRTtnQkFDbkIsb0JBQW9CLEVBQUU7b0JBQ3BCLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO2lCQUNyRDthQUNGO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUUvQyxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQzdELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbEMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN6QyxVQUFVLEVBQUUsSUFBSTtZQUNoQixHQUFHO1NBQ0osQ0FBQyxDQUFBO1FBRUYsbUVBQW1FO1FBQ25FLE1BQU0s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SUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0QyxLQUFLLEVBQUUsWUFBWTtTQUNwQixDQUFDLENBQUE7UUFFRixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFBO1FBRTdELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3JDLEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUMsQ0FBQTtRQUVGLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFBO1FBQy9DLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBRWhELENBQUM7Q0FDRjtBQTNIRCxrREEySEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XHJcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMnO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XHJcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdAYXdzLWNkay9hd3MtZWMyJztcclxuaW1wb3J0ICogYXMgbmVwdHVuZSBmcm9tICdAYXdzLWNkay9hd3MtbmVwdHVuZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwc3luY05lcHR1bmVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcHBzeW5jLkdyYXBocWxBcGkodGhpcywgJ0FwaScsIHtcclxuICAgICAgbmFtZTogJ05lcHR1bmVBUEknLFxyXG4gICAgICBzY2hlbWE6IGFwcHN5bmMuU2NoZW1hLmZyb21Bc3NldCgnZ3JhcGhxbC9zY2hlbWEuZ3JhcGhxbCcpLFxyXG4gICAgICBhdXRob3JpemF0aW9uQ29uZmlnOiB7XHJcbiAgICAgICAgZGVmYXVsdEF1dGhvcml6YXRpb246IHtcclxuICAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBhcHBzeW5jLkF1dGhvcml6YXRpb25UeXBlLkFQSV9LRVlcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCB2cGMgPSBuZXcgZWMyLlZwYyh0aGlzLCAnTmV3TmVwdHVuZVZQQycpO1xyXG5cclxuICAgIGNvbnN0IGxhbWJkYUZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnTGFtYmRhIEZ1bmN0aW9uJywge1xyXG4gICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxyXG4gICAgICBoYW5kbGVyOiAnbWFpbi5oYW5kbGVyJyxcclxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEtZm5zJyksXHJcbiAgICAgIG1lbW9yeVNpemU6IDEwMjQsXHJcbiAgICAgIHZwY1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgLy8gc2V0IHRoZSBuZXcgTGFtYmRhIGZ1bmN0aW9uIGFzIGEgZGF0YSBzb3VyY2UgZm9yIHRoZSBBcHBTeW5jIEFQSVxyXG4gICAgY29uc3QgbGFtYmRhRHMgPSBhcGkuYWRkTGFtYmRhRGF0YVNvdXJjZSgnbGFtYmRhRGF0YXNvdXJjZScsIGxhbWJkYUZuKTtcclxuICAgIC8vUXVlcnlcclxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcclxuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcclxuICAgICAgZmllbGROYW1lOiBcInVzZXJGcmllbmRMaXN0XCJcclxuICAgIH0pXHJcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXHJcbiAgICAgIGZpZWxkTmFtZTogXCJmcmllbmRvZkZyaWVuZFwiXHJcbiAgICB9KVxyXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxyXG4gICAgICBmaWVsZE5hbWU6IFwicmVjb21tZW5kQnlGcmllbmRcIlxyXG4gICAgfSlcclxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcclxuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcclxuICAgICAgZmllbGROYW1lOiBcInJlc3RhdXJhbnRSYXRlZEJ5RnJpZW5kXCJcclxuICAgIH0pXHJcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXHJcbiAgICAgIGZpZWxkTmFtZTogXCJyZXN0YXVyYW50QnljdWlzaW5lXCJcclxuICAgIH0pXHJcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXHJcbiAgICAgIGZpZWxkTmFtZTogXCJuZXdlc3RSZXZpZXdcIlxyXG4gICAgfSlcclxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcclxuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcclxuICAgICAgZmllbGROYW1lOiBcIm5lYXJlc3RIUlJlc3RhdXJhbnRcIlxyXG4gICAgfSlcclxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcclxuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcclxuICAgICAgZmllbGROYW1lOiBcInBhc3RYRGF5c1wiXHJcbiAgICB9KVxyXG4gICAgLy90ZXN0IHF1ZXJpZXMgcmVzb3ZsZXJcclxuICAgIGxhbWJkYURzLmNyZWF0ZVJlc29sdmVyKHtcclxuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcclxuICAgICAgZmllbGROYW1lOiBcImdldFJldmlld1wiXHJcbiAgICB9KVxyXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxyXG4gICAgICBmaWVsZE5hbWU6IFwiZ2V0UmVzdGF1cmFudFwiXHJcbiAgICB9KVxyXG4gICAgLy9WZXJ0aWNlc1xyXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxyXG4gICAgICBmaWVsZE5hbWU6IFwiYWRkVXNlclwiXHJcbiAgICB9KVxyXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxyXG4gICAgICBmaWVsZE5hbWU6IFwiYWRkUmV2aWV3c1wiXHJcbiAgICB9KVxyXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxyXG4gICAgICBmaWVsZE5hbWU6IFwiYWRkUmVzdGF1cmFudFwiXHJcbiAgICB9KVxyXG4gICAgLy9FZGdlc1xyXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxyXG4gICAgICBmaWVsZE5hbWU6IFwiY3JlYXRlRnJpZW5kU2hpcFwiXHJcbiAgICB9KVxyXG4gICAgbGFtYmRhRHMuY3JlYXRlUmVzb2x2ZXIoe1xyXG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxyXG4gICAgICBmaWVsZE5hbWU6IFwiYWRkUmV2aWV3XCJcclxuICAgIH0pXHJcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXHJcbiAgICAgIGZpZWxkTmFtZTogXCJyZWNvbW1lbmRSZXN0YXVyYW50XCJcclxuICAgIH0pXHJcbiAgICBsYW1iZGFEcy5jcmVhdGVSZXNvbHZlcih7XHJcbiAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXHJcbiAgICAgIGZpZWxkTmFtZTogXCJhYm91dFwiXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICBjb25zdCBjbHVzdGVyID0gbmV3IG5lcHR1bmUuRGF0YWJhc2VDbHVzdGVyKHRoaXMsICdOZXB0dW5lQ2x1c3RlcicsIHtcclxuICAgICAgdnBjLFxyXG4gICAgICBpbnN0YW5jZVR5cGU6IG5lcHR1bmUuSW5zdGFuY2VUeXBlLlQzX01FRElVTVxyXG4gICAgfSlcclxuXHJcbiAgICBjbHVzdGVyLmNvbm5lY3Rpb25zLmFsbG93RGVmYXVsdFBvcnRGcm9tQW55SXB2NCgnT3BlbiB0byB0aGUgd29ybGQnKVxyXG5cclxuICAgIGNvbnN0IHdyaXRlQWRkcmVzcyA9IGNsdXN0ZXIuY2x1c3RlckVuZHBvaW50LnNvY2tldEFkZHJlc3M7XHJcblxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ3dyaXRlYWRkcmVzcycsIHtcclxuICAgICAgdmFsdWU6IHdyaXRlQWRkcmVzc1xyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCByZWFkQWRkcmVzcyA9IGNsdXN0ZXIuY2x1c3RlclJlYWRFbmRwb2ludC5zb2NrZXRBZGRyZXNzXHJcblxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ3JlYWRhZGRyZXNzJywge1xyXG4gICAgICB2YWx1ZTogcmVhZEFkZHJlc3NcclxuICAgIH0pXHJcblxyXG4gICAgbGFtYmRhRm4uYWRkRW52aXJvbm1lbnQoJ1dSSVRFUicsIHdyaXRlQWRkcmVzcylcclxuICAgIGxhbWJkYUZuLmFkZEVudmlyb25tZW50KCdSRUFERVInLCByZWFkQWRkcmVzcylcclxuXHJcbiAgfVxyXG59Il19