import { AppSyncResolverHandler } from "aws-lambda";
import { sign } from "jsonwebtoken";
import {
  CognitoIdentityServiceProvider as cognito,
  AppSync,
  DynamoDB,
  EventBridge,
} from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

type input = {
  devId: string;
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

  //////////// JWT TOKEN //////////////////

  /**
   * The dev is going to be given this JWT Token which they are going to send in the header of all of their API requests like :
   * 'x-panacloud-hdr': 'eytyadj7adf9sffDg8kog8ffv0e0ewrfof90v9j09'
   * This token is going to have as part of the payload,
   * The Developer's Identifer DevId and the API's Identifier apiId.
   * We can also add further info to it like expiration date etc. which will help the extension verify?
   * The developer should also be given an APIKEY that will be added to the list of allowed APIKEYS of the
   * API to which he is subscribing to.
   *
   */

  //////////// DynamoDB Setup ////////////////////
  /// Get secret_key from dynamoDB
  const tableName = process.env.TENANT_TABLE;
  if (!tableName) {
    throw new Error("TENANT_TABLE Not found in env");
  }
  const apiDetails = await ddb
    .get({
      TableName: tableName,
      // ProjectionExpression: "secret_key",
      Key: { pk: event.arguments.apiId, sk: "A" },
    })
    .promise();
  console.log("SECRET ITEM FROM DDB", apiDetails);
  const subscriptionId = uuidv4();

  const JsonToConvert = {
    devId: event.arguments.devId,
    apiId: event.arguments.apiId,
    subscriptionId,
  };
  const token = sign(JsonToConvert, apiDetails?.Item?.secret_key);

  // apiKey SHOULD COME FROM THE DEV WHO IS OWNER OF API
  // OR THIS NEEDS TO BE SENT TO THE DEV SO HE CAN ADD IT TO HIS LIST OF AUTHORIZED KEYS
  const apiKey = uuidv4();
  ///////////////////////////////////////////////

  const ddb_dev_item = {
    Item: {
      pk: event.arguments.devId,
      sk: "S:" + event.arguments.apiId,
      pk1: apiKey,
      type: "apiSubscriberRelation",
      subscriptionDate: new Date().toISOString(),
      subscriptionId,
      token,
    },
    TableName: tableName,
  };
  await ddb.put(ddb_dev_item).promise();

  // const apiDetails = await ddb
  //   .get({
  //     TableName: tableName,
  //     Key: { pk: event.arguments.apiId, sk: "A" },
  //   })
  //   .promise();

  const subscriberDetails = await ddb
    .get({
      TableName: tableName,
      Key: { pk: event.arguments.devId, sk: "A" },
    })
    .promise();

  const owner = await ddb
    .get({
      TableName: tableName,
      Key: { pk: apiDetails.Item?.created_by, sk: "A" },
    })
    .promise();

  const item = {
    subscriptionId,
    apiId: event.arguments.apiId,
    owner_email: owner.Item?.email,
    subscriber_email: subscriberDetails.Item?.email,
    apiKey
  };

  console.log("ddb object sending to eventbridge", item);
  const eventToSend = {
    Entries: [
      {
        Detail: JSON.stringify(item),
        DetailType: "create_subscribed_api",
        EventBusName: "grafana_event",
        Source: "grafana",
      },
    ],
  };
  const evResult = await eventbridge.putEvents(eventToSend).promise();
  console.log("reslt of putevnt", evResult);

  return { apiKey, jwt: token, subscriptionId };
  // return `apiKey: ${apiKey}, JWT To send with your requests: ${token} in the x-panacloudd-tkn header`;
};
