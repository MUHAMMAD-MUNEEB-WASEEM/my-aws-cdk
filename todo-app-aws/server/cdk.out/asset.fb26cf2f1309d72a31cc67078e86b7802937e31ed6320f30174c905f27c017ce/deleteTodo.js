"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
async function deleteTodo(todoId) {
    const params = {
        TableName: process.env.TODOS_TABLE,
        Key: {
            id: todoId
        }
    };
    try {
        await docClient.delete(params).promise();
        return todoId;
    }
    catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}
exports.default = deleteTodo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlVG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbGV0ZVRvZG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRXBELEtBQUssVUFBVSxVQUFVLENBQUMsTUFBYztJQUNwQyxNQUFNLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7UUFDbEMsR0FBRyxFQUFFO1lBQ0QsRUFBRSxFQUFFLE1BQU07U0FDYjtLQUNKLENBQUE7SUFDRCxJQUFJO1FBQ0EsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3hDLE9BQU8sTUFBTSxDQUFBO0tBQ2hCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3BDLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFDTCxDQUFDO0FBRUQsa0JBQWUsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IEFXUyA9IHJlcXVpcmUoJ2F3cy1zZGsnKTtcclxuY29uc3QgZG9jQ2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQi5Eb2N1bWVudENsaWVudCgpO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlVG9kbyh0b2RvSWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET1NfVEFCTEUsXHJcbiAgICAgICAgS2V5OiB7XHJcbiAgICAgICAgICAgIGlkOiB0b2RvSWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGRvY0NsaWVudC5kZWxldGUocGFyYW1zKS5wcm9taXNlKClcclxuICAgICAgICByZXR1cm4gdG9kb0lkXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRHluYW1vREIgZXJyb3I6ICcsIGVycilcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWxldGVUb2RvOyJdfQ==