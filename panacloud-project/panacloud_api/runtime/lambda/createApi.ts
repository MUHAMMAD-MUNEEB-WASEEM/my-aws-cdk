import { AppSyncResolverHandler } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import {
  CognitoIdentityServiceProvider as cognito,
  AppSync,
  DynamoDB,
  EventBridge,
} from "aws-sdk";

type input = {
  devId: string;
  title: string;
  description: string;
  image_url: string;
  schema_uri: string;
  secret_key: string;
};

/**
 * # Lambda Handler Responsibility:
 * - Create API Item (PUBLIC BY DEFAULT) and insert into DynamoDB.
 * - Publish Event to Eventbridge for API creation.
 *
 */
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
  const apiId = uuidv4();
  const ddb_api_item = {
    Item: {
      pk: event.arguments.devId,
      sk: "C:" + apiId,
      type: "apiOwnerRelation",
    },
    TableName: tableName,
  };
  await ddb.put(ddb_api_item).promise();

  const ddb_dev_item = {
    Item: {
      pk: apiId,
      sk: "A",
      type: "api",
      pk1: "PUBLIC",
      description: event.arguments.description,
      title: event.arguments.title,
      image_url: event.arguments.image_url,
      schema_uri: event.arguments.schema_uri,
      created_by: event.arguments.devId,
      secret_key: event.arguments.secret_key ?? "PANACLOUD_SECRET",
    },
    TableName: tableName,
  };
  await ddb.put(ddb_dev_item).promise();

  const tmp = await ddb
    .get({
      TableName: tableName,
      Key: {
        pk: event.arguments.devId,
        sk: "A",
      },
    })
    .promise();
  console.log("dev item from get", tmp);

  const item = {
    apiId,
    email: tmp.Item?.email,
    devId: event.arguments.devId,
  };

  const eventToSend = {
    Entries: [
      {
        Detail: JSON.stringify(item),
        DetailType: "create_saas_api",
        EventBusName: "grafana_event",
        Source: "grafana",
      },
    ],
  };
  const evResult = await eventbridge.putEvents(eventToSend).promise();
  console.log("reslt of putevnt", evResult);

  return `Success, Public apiId: ${apiId}`;
};
