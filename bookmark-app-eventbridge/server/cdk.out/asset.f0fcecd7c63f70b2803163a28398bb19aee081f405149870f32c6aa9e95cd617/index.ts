import { EventBridgeEvent, Context } from "aws-lambda";
import * as AWS from "aws-sdk";


const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME as string;

exports.handler = async (event: EventBridgeEvent<string, any>, context: Context) => {

    try {
        if (event["detail-type"] === "addBookmark") {

            console.log("detail===>", JSON.stringify(event.detail, null, 2));

            const params = {
                TableName: TABLE_NAME,
                Item: {
                    ...event.detail,
                },
            };
            await dynamoClient.put(params).promise();
        }

    }
    catch (err) {
        console.log(err)
    }
}