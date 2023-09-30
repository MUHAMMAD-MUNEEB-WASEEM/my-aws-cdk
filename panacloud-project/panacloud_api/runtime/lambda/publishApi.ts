import { AppSyncResolverHandler } from "aws-lambda";
import {
  CognitoIdentityServiceProvider as cognito,
  AppSync,
  DynamoDB,
  EventBridge,
} from "aws-sdk";
// import { v4 as uuidv4 } from "uuid";

type input = {
  apiId: string;
};

export const handler: AppSyncResolverHandler<input, any> = async (
  event,
  context
) => {
  const ddb = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
  const eventbridge = new EventBridge({
    apiVersion: "2015-10-07",
    region: "us-east-1",
  });

  //////////// DynamoDB Setup ////////////////////
  const tableName = process.env.TENANT_TABLE;
  if (!tableName) {
    throw new Error("TENANT_TABLE Not found in env");
  }
  const ddb_api_item = {
    TableName: tableName,
    Key: { pk: event.arguments.apiId, sk: "A" },
    UpdateExpression: "set pk1 = :P",
    ExpressionAttributeValues: {
      ":P": "PUBLIC",
    },
  };
  await ddb.update(ddb_api_item).promise();

  const eventToSend = {
    Entries: [
      {
        Detail: `${event.arguments.apiId} has been published.`,
        DetailType: "API Published",
        EventBusName: "grafana_event",
        Source: "ERU-Publish API Lambda",
      },
    ],
  };
  const evResult = await eventbridge.putEvents(eventToSend).promise();

  return `Successfully published ${event.arguments.apiId}`;
};
