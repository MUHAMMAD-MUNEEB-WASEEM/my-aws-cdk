import { AppSyncResolverHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

type input = {
  devId: string;
};

async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, allItems: T[]) => void
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
/**
 * # Lambda Handler Responsibility:
 * - Fetch all subscriptions by devId
 *
 */
export const handler: AppSyncResolverHandler<input, any> = async (
  event,
  context
) => {
  const ddb = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

  //////////// DynamoDB Setup ////////////////////
  const tableName = process.env.TENANT_TABLE;
  if (!tableName) {
    throw new Error("TENANT_TABLE Not found in env");
  }

  // Validate if Developer exists.
  const dev = await ddb
    .get({
      TableName: tableName,
      Key: {
        pk: event.arguments.devId,
        sk: "A",
      },
    })
    .promise();
  console.log("dev item from get", dev);
  // DynamoDB getItem returns Nothing for the Item in the result if it finds no match
  if (!dev.Item) throw new Error("No developer with supplied devId found.");

  const params = {
    TableName: tableName,
    KeyConditionExpression: "#pk = :pkey and begins_with(#sk, :skey)",
    ExpressionAttributeValues: {
      ":pkey": event.arguments.devId,
      ":skey": "S:",
    },
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk",
    },
  };

  let result = [];

  const subList = await ddb.query(params).promise();
  console.log(subList);

  await asyncForEach(subList.Items, async (item) => {
    let apiDetails = await ddb
      .get({
        TableName: tableName,
        Key: {
          pk: item.sk.substring(2),
          sk: "A",
        },
      })
      .promise();
    console.log("api item", apiDetails);
    let itemToInsert = {
      subscriptionDate: item.subscriptionDate,
      apiId: item.sk.substring(2),
      devId: item.pk,
      type: item.type,
      subscriptionId: item.subscriptionId,
      token: item.token,
      apiKey: item.pk1,
      apiTitle: apiDetails.Item.title,
      apiDescription: apiDetails.Item.description,
    };
    console.log("item", itemToInsert);
    result.push(itemToInsert);
  });

  console.log("result array", result);

  return result;
};
