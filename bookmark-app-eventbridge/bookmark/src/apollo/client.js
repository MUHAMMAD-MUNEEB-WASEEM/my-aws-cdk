  
import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://luhhiafqqjeanh3bxdvwedc23q.appsync-api.us-east-2.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-tloknnm4a5gxnejmroqkexolka", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})