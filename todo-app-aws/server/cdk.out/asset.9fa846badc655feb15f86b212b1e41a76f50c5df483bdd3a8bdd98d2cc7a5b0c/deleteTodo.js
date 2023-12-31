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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlVG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbGV0ZVRvZG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRXBELEtBQUssVUFBVSxVQUFVLENBQUMsRUFBVTtJQUNoQyxNQUFNLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7UUFDbEMsR0FBRyxFQUFFO1lBQ0QsRUFBRTtTQUNMO0tBQ0osQ0FBQTtJQUNELElBQUk7UUFDQSxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFFRCxrQkFBZSxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XHJcbmNvbnN0IGRvY0NsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRvZG8oaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET1NfVEFCTEUsXHJcbiAgICAgICAga2V5OiB7XHJcbiAgICAgICAgICAgIGlkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBkb2NDbGllbnQuZGVsZXRlKHBhcmFtcykucHJvbWlzZTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRHluYW1vREIgZXJyb3I6ICcsIGVycik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlbGV0ZVRvZG87Il19