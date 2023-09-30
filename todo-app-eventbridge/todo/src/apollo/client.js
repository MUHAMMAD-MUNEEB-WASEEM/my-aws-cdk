import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://xjeo5rxw2zeczgdjk6rx3v7tzi.appsync-api.us-east-2.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-badin7fzkvcfnfea3l27wul6sy", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})