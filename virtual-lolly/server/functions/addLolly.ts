const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
import Lolly from './lolly';

async function addLolly(lolly: Lolly) {
    const params = {
        TableName: process.env.LOLLY_TABLE,
        Item: lolly
    }
    try {
        await docClient.put(params).promise();
        return lolly;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default addLolly;