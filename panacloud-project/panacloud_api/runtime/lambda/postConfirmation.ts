import { PostConfirmationTriggerHandler } from "aws-lambda";
import {
  CognitoIdentityServiceProvider as cognito,
  AppSync,
  DynamoDB,
  EventBridge,
} from "aws-sdk";

/**
 * The purpose of this function is to generate a unique identifier for the developer that has
 * confirmed signup and save it to dynamoDB.
 *
 * The other option is to just use the `sub` that cognito generates and use that as our uuid
 * and just store that in DynamoDB.
 * https://stackoverflow.com/questions/39223347/should-i-use-aws-cognito-username-or-sub-uid-for-storing-in-database
 */
export const handler: PostConfirmationTriggerHandler = async (
  event,
  context
) => {
  console.log("event", event);
  console.log("context", context);

  //////////// DynamoDB Setup ////////////////////
  const ddb = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
  const eventbridge = new EventBridge({
    apiVersion: "2015-10-07",
    region: "us-east-1",
  });

  const tableName = process.env.TENANT_TABLE;
  if (!tableName) {
    throw new Error("TENANT_TABLE Not found in env");
  }
  const ddb_item = {
    Item: {
      pk: event.request.userAttributes.sub,
      sk: "A",
      type: "developer",
      email: event.request.userAttributes.email,
      address: event.request.userAttributes.address,
      name: event.request.userAttributes.name,
      phone_number: event.request.userAttributes.phone_number,
    },
    TableName: tableName,
  };
  const r = await ddb.put(ddb_item).promise();
  console.log("reslt of ddbput", r);
  console.log("ddb object sending to eventbridge", ddb_item);
  ////////////////////////////////////////////////

  const eventToSend = {
    Entries: [
      {
        Detail: JSON.stringify(ddb_item),
        DetailType: "create_user",
        EventBusName: "grafana_event",
        Source: "grafana",
      },
    ],
  };
  const evResult = await eventbridge.putEvents(eventToSend).promise();
  console.log("reslt of putevnt", evResult);
  return event;
};
