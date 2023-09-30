"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
async function todos() {
    const params = {
        TableName: process.env.TODOS_TABLE,
    };
    try {
        const data = await docClient.scan(params).promise();
        return data.Items;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}
exports.default = todos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRvZG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRXBELEtBQUssVUFBVSxLQUFLO0lBQ2hCLE1BQU0sTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztLQUNyQyxDQUFBO0lBQ0QsSUFBSTtRQUNBLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNuRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7S0FDcEI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDcEMsT0FBTyxJQUFJLENBQUE7S0FDZDtBQUNMLENBQUM7QUFFRCxrQkFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBV1MgPSByZXF1aXJlKCdhd3Mtc2RrJyk7XHJcbmNvbnN0IGRvY0NsaWVudCA9IG5ldyBBV1MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHRvZG9zKCkge1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET1NfVEFCTEUsXHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkb2NDbGllbnQuc2NhbihwYXJhbXMpLnByb21pc2UoKVxyXG4gICAgICAgIHJldHVybiBkYXRhLkl0ZW1zXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRHluYW1vREIgZXJyb3I6ICcsIGVycilcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0b2RvczsiXX0=