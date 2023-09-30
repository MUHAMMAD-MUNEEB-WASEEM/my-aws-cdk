
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteTodo(id: string) {
    const params = {
        TableName: process.env.TODOS_TABLE,
        Key: {
            id: id
        }
    }
    try {
        await docClient.delete(params).promise()
        return 'Delte todo'
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}

export default deleteTodo;