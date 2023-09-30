"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
async function deleteTodo(id) {
    const params = {
        TableName: process.env.TODOS_TABLE,
        key: {
            id
        }
    };
    try {
        await docClient.delete(params).promise;
        return id;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}
exports.default = deleteTodo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlVG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbGV0ZVRvZG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBR3BELEtBQUssVUFBVSxVQUFVLENBQUMsRUFBVTtJQUNoQyxNQUFNLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7UUFDbEMsR0FBRyxFQUFFO1lBQ0QsRUFBRTtTQUNMO0tBQ0osQ0FBQTtJQUNELElBQUk7UUFDQSxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFFRCxrQkFBZSxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XHJcbmNvbnN0IGRvY0NsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcclxuaW1wb3J0IGlkIGZyb20gJy4vaWQnXHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVUb2RvKGlkOiBTdHJpbmcpIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlRPRE9TX1RBQkxFLFxyXG4gICAgICAgIGtleToge1xyXG4gICAgICAgICAgICBpZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZG9jQ2xpZW50LmRlbGV0ZShwYXJhbXMpLnByb21pc2U7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0R5bmFtb0RCIGVycm9yOiAnLCBlcnIpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWxldGVUb2RvOyJdfQ==