const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import id from './id'

async function deleteTodo(id: String) {
    const params = {
        TableName: process.env.TODOS_TABLE,
        key: {
            id
        }
    }
    try {
        await docClient.delete(params).promise;
        return id;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default deleteTodo;