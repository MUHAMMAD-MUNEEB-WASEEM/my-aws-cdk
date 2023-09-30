const AWS = require('aws-sdk');
import { EventBridgeEvent, Context } from "aws-lambda";
const docClient = new AWS.DynamoDB.DocumentClient();
import Bookmark from './bookmark';

async function addBookmark(bookmark: Bookmark) {
    const params = {
        TableName: process.env.BOOKMARK_TABLE,
        Item: bookmark
    }
    try {
        await docClient.put(params).promise();
        return bookmark;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default addBookmark;