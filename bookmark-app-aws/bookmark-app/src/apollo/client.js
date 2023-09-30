  
import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://prpbytjw6ndkre3m2rurs34vby.appsync-api.us-east-2.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-gs7qdgrpp5fvhjwd5v2xudkiam", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})