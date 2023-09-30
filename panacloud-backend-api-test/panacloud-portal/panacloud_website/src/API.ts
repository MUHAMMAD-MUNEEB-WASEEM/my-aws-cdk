/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateApiMutationVariables = {
  devId: string,
  title: string,
  description: string,
  image_url?: string | null,
  schema_uri?: string | null,
};

export type CreateApiMutation = {
  createApi: string,
};

export type CreateDevApiMutationVariables = {
  devId: string,
  title: string,
  description: string,
  image_url?: string | null,
  schema_uri?: string | null,
};

export type CreateDevApiMutation = {
  createDevApi: string,
};

export type SubscribeToApiMutationVariables = {
  devId: string,
  apiId: string,
};

export type SubscribeToApiMutation = {
  subscribeToApi:  {
    __typename: "ApiSubscriptionResponse",
    apiKey: string,
    jwt: string,
    subscriptionId: string,
  } | null,
};

export type PublishApiMutationVariables = {
  apiId: string,
};

export type PublishApiMutation = {
  publishApi: string | null,
};

export type FetchAllPublicApisQuery = {
  fetchAllPublicApis:  Array< {
    __typename: "Api",
    pk1: string,
    sk: string,
    type: string,
    description: string,
    pk: string,
    title: string,
    image_url: string | null,
    schema_uri: string | null,
    created_by: string | null,
    secret_key: string | null,
  } | null > | null,
};

export type FetchAllUnderdevelopmentApisQuery = {
  fetchAllUnderdevelopmentApis:  Array< {
    __typename: "Api",
    pk1: string,
    sk: string,
    type: string,
    description: string,
    pk: string,
    title: string,
    image_url: string | null,
    schema_uri: string | null,
    created_by: string | null,
    secret_key: string | null,
  } | null > | null,
};

export type FetchUnderdevelopmentApisForDevQueryVariables = {
  devId: string,
};

export type FetchUnderdevelopmentApisForDevQuery = {
  fetchUnderdevelopmentApisForDev:  Array< {
    __typename: "Api",
    pk1: string,
    sk: string,
    type: string,
    description: string,
    pk: string,
    title: string,
    image_url: string | null,
    schema_uri: string | null,
    created_by: string | null,
    secret_key: string | null,
  } | null > | null,
};

export type FetchPublishedApisForDevQueryVariables = {
  devId: string,
};

export type FetchPublishedApisForDevQuery = {
  fetchPublishedApisForDev:  Array< {
    __typename: "Api",
    pk1: string,
    sk: string,
    type: string,
    description: string,
    pk: string,
    title: string,
    image_url: string | null,
    schema_uri: string | null,
    created_by: string | null,
    secret_key: string | null,
  } | null > | null,
};

export type FetchCreatedApisQueryVariables = {
  devId: string,
};

export type FetchCreatedApisQuery = {
  fetchCreatedApis:  Array< {
    __typename: "ApiCreation",
    sk: string | null,
    pk: string | null,
    type: string | null,
  } | null > | null,
};

export type FetchApiDetailsQueryVariables = {
  apiId: string,
};

export type FetchApiDetailsQuery = {
  fetchApiDetails:  {
    __typename: "Api",
    pk1: string,
    sk: string,
    type: string,
    description: string,
    pk: string,
    title: string,
    image_url: string | null,
    schema_uri: string | null,
    created_by: string | null,
    secret_key: string | null,
  } | null,
};

export type FetchDevDetailsQueryVariables = {
  devId: string,
};

export type FetchDevDetailsQuery = {
  fetchDevDetails:  {
    __typename: "Dev",
    pk: string,
    sk: string,
    type: string,
    address: string,
    email: string,
    name: string,
    phone_number: string,
  } | null,
};

export type FetchSubscriptionsQueryVariables = {
  devId: string,
};

export type FetchSubscriptionsQuery = {
  fetchSubscriptions:  Array< {
    __typename: "ApiSubscription",
    subscriptionDate: string | null,
    sk: string | null,
    pk1: string | null,
    pk: string | null,
    type: string | null,
    subscriptionId: string | null,
    token: string | null,
  } | null > | null,
};

export type FetchSubscriptionsWithDetailsQueryVariables = {
  devId: string,
};

export type FetchSubscriptionsWithDetailsQuery = {
  fetchSubscriptionsWithDetails:  Array< {
    __typename: "ApiSubscriptionWithDetails",
    subscriptionDate: string | null,
    apiId: string | null,
    devId: string | null,
    type: string | null,
    subscriptionId: string | null,
    token: string | null,
    apiKey: string | null,
    apiTitle: string | null,
    apiDescription: string | null,
  } | null > | null,
};

export type FetchSubscribersQueryVariables = {
  apiId: string,
};

export type FetchSubscribersQuery = {
  fetchSubscribers:  Array< {
    __typename: "ApiSubscription",
    subscriptionDate: string | null,
    sk: string | null,
    pk1: string | null,
    pk: string | null,
    type: string | null,
    subscriptionId: string | null,
    token: string | null,
  } | null > | null,
};

export type GetTokenForKeyQueryVariables = {
  apiKey: string,
};

export type GetTokenForKeyQuery = {
  getTokenForKey:  Array< {
    __typename: "ApiSubscription",
    subscriptionDate: string | null,
    sk: string | null,
    pk1: string | null,
    pk: string | null,
    type: string | null,
    subscriptionId: string | null,
    token: string | null,
  } | null > | null,
};
