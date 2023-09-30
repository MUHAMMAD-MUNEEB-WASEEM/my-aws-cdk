/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createApi = /* GraphQL */ `
  mutation CreateApi(
    $devId: String!
    $title: String!
    $description: String!
    $image_url: String
    $schema_uri: String
  ) {
    createApi(
      devId: $devId
      title: $title
      description: $description
      image_url: $image_url
      schema_uri: $schema_uri
    )
  }
`;
export const createDevApi = /* GraphQL */ `
  mutation CreateDevApi(
    $devId: String!
    $title: String!
    $description: String!
    $image_url: String
    $schema_uri: String
  ) {
    createDevApi(
      devId: $devId
      title: $title
      description: $description
      image_url: $image_url
      schema_uri: $schema_uri
    )
  }
`;
export const subscribeToApi = /* GraphQL */ `
  mutation SubscribeToApi($devId: String!, $apiId: String!) {
    subscribeToApi(devId: $devId, apiId: $apiId) {
      apiKey
      jwt
      subscriptionId
    }
  }
`;
export const publishApi = /* GraphQL */ `
  mutation PublishApi($apiId: String!) {
    publishApi(apiId: $apiId)
  }
`;
