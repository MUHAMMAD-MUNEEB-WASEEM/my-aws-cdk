/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchAllPublicApis = /* GraphQL */ `
  query FetchAllPublicApis {
    fetchAllPublicApis {
      pk1
      sk
      type
      description
      pk
      title
      image_url
      schema_uri
      created_by
      secret_key
    }
  }
`;
export const fetchAllUnderdevelopmentApis = /* GraphQL */ `
  query FetchAllUnderdevelopmentApis {
    fetchAllUnderdevelopmentApis {
      pk1
      sk
      type
      description
      pk
      title
      image_url
      schema_uri
      created_by
      secret_key
    }
  }
`;
export const fetchUnderdevelopmentApisForDev = /* GraphQL */ `
  query FetchUnderdevelopmentApisForDev($devId: String!) {
    fetchUnderdevelopmentApisForDev(devId: $devId) {
      pk1
      sk
      type
      description
      pk
      title
      image_url
      schema_uri
      created_by
      secret_key
    }
  }
`;
export const fetchPublishedApisForDev = /* GraphQL */ `
  query FetchPublishedApisForDev($devId: String!) {
    fetchPublishedApisForDev(devId: $devId) {
      pk1
      sk
      type
      description
      pk
      title
      image_url
      schema_uri
      created_by
      secret_key
    }
  }
`;
export const fetchCreatedApis = /* GraphQL */ `
  query FetchCreatedApis($devId: String!) {
    fetchCreatedApis(devId: $devId) {
      sk
      pk
      type
    }
  }
`;
export const fetchApiDetails = /* GraphQL */ `
  query FetchApiDetails($apiId: String!) {
    fetchApiDetails(apiId: $apiId) {
      pk1
      sk
      type
      description
      pk
      title
      image_url
      schema_uri
      created_by
      secret_key
    }
  }
`;
export const fetchDevDetails = /* GraphQL */ `
  query FetchDevDetails($devId: String!) {
    fetchDevDetails(devId: $devId) {
      pk
      sk
      type
      address
      email
      name
      phone_number
    }
  }
`;
export const fetchSubscriptions = /* GraphQL */ `
  query FetchSubscriptions($devId: String!) {
    fetchSubscriptions(devId: $devId) {
      subscriptionDate
      sk
      pk1
      pk
      type
      subscriptionId
      token
    }
  }
`;
export const fetchSubscriptionsWithDetails = /* GraphQL */ `
  query FetchSubscriptionsWithDetails($devId: String!) {
    fetchSubscriptionsWithDetails(devId: $devId) {
      subscriptionDate
      apiId
      devId
      type
      subscriptionId
      token
      apiKey
      apiTitle
      apiDescription
    }
  }
`;
export const fetchSubscribers = /* GraphQL */ `
  query FetchSubscribers($apiId: String!) {
    fetchSubscribers(apiId: $apiId) {
      subscriptionDate
      sk
      pk1
      pk
      type
      subscriptionId
      token
    }
  }
`;
export const getTokenForKey = /* GraphQL */ `
  query GetTokenForKey($apiKey: String!) {
    getTokenForKey(apiKey: $apiKey) {
      subscriptionDate
      sk
      pk1
      pk
      type
      subscriptionId
      token
    }
  }
`;
