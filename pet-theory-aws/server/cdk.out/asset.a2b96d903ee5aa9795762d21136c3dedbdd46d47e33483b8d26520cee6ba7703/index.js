"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const crypto_1 = require("crypto");
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
exports.handler = async (event, context) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: crypto_1.randomBytes(4).toString("hex"),
            ...event.detail,
        },
    };
    try {
        await dynamoClient.put(params).promise();
    }
    catch (err) {
        console.log("DynamoDB error: ", err);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtCQUErQjtBQUUvQixtQ0FBcUM7QUFLckMsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQTJCLENBQUM7QUFFM0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBb0MsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDL0UsTUFBTSxNQUFNLEdBQUc7UUFDWCxTQUFTLEVBQUUsVUFBVTtRQUNyQixJQUFJLEVBQUU7WUFDRixFQUFFLEVBQUUsb0JBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2xDLEdBQUcsS0FBSyxDQUFDLE1BQU07U0FDbEI7S0FDSixDQUFDO0lBRUYsSUFBSTtRQUNBLE1BQU0sWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUV4QztJQUVMLE9BQU8sR0FBRyxFQUFFO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUV4QztBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QnJpZGdlRXZlbnQsIENvbnRleHQgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIjtcclxuXHJcbmltcG9ydCB7IHJhbmRvbUJ5dGVzIH0gZnJvbSAnY3J5cHRvJztcclxuXHJcblxyXG5cclxuXHJcbmNvbnN0IGR5bmFtb0NsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcclxuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LkRZTkFNT19UQUJMRV9OQU1FIGFzIHN0cmluZztcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogRXZlbnRCcmlkZ2VFdmVudDxzdHJpbmcsIGFueT4sIGNvbnRleHQ6IENvbnRleHQpID0+IHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXHJcbiAgICAgICAgSXRlbToge1xyXG4gICAgICAgICAgICBpZDogcmFuZG9tQnl0ZXMoNCkudG9TdHJpbmcoXCJoZXhcIiksXHJcbiAgICAgICAgICAgIC4uLmV2ZW50LmRldGFpbCxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGR5bmFtb0NsaWVudC5wdXQocGFyYW1zKS5wcm9taXNlKCk7XHJcbiAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEeW5hbW9EQiBlcnJvcjogXCIsIGVycik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=