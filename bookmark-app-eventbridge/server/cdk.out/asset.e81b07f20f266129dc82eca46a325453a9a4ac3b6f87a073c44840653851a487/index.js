"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const crypto_1 = require("crypto");
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;
exports.handler = async (event, context) => {
    try {
        if (event["detail-type"] === "addBookmark") {
            console.log("detail===>", JSON.stringify(event.detail, null, 2));
            const params = {
                TableName: TABLE_NAME,
                Item: {
                    id: crypto_1.randomBytes(4).toString("hex"),
                    ...event.detail,
                },
            };
            await dynamoClient.put(params).promise();
        }
    }
    catch (err) {
        console.log(err);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtCQUErQjtBQUMvQixtQ0FBcUM7QUFHckMsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQTJCLENBQUM7QUFFM0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBb0MsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFFL0UsSUFBSTtRQUNBLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLGFBQWEsRUFBRTtZQUV4QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakUsTUFBTSxNQUFNLEdBQUc7Z0JBQ1gsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLElBQUksRUFBRTtvQkFDRixFQUFFLEVBQUUsb0JBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO29CQUNsQyxHQUFHLEtBQUssQ0FBQyxNQUFNO2lCQUNsQjthQUNKLENBQUM7WUFDRixNQUFNLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUM7S0FFSjtJQUNELE9BQU8sR0FBRyxFQUFFO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNuQjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QnJpZGdlRXZlbnQsIENvbnRleHQgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIjtcclxuaW1wb3J0IHsgcmFuZG9tQnl0ZXMgfSBmcm9tICdjcnlwdG8nO1xyXG5cclxuXHJcbmNvbnN0IGR5bmFtb0NsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcclxuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LkRZTkFNT19UQUJMRV9OQU1FIGFzIHN0cmluZztcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogRXZlbnRCcmlkZ2VFdmVudDxzdHJpbmcsIGFueT4sIGNvbnRleHQ6IENvbnRleHQpID0+IHtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChldmVudFtcImRldGFpbC10eXBlXCJdID09PSBcImFkZEJvb2ttYXJrXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGV0YWlsPT09PlwiLCBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwsIG51bGwsIDIpKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcclxuICAgICAgICAgICAgICAgIEl0ZW06IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogcmFuZG9tQnl0ZXMoNCkudG9TdHJpbmcoXCJoZXhcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uZXZlbnQuZGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYXdhaXQgZHluYW1vQ2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgIH1cclxufSJdfQ==