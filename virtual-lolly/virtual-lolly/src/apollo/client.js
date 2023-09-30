  
  
import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://b2oxv2fz4ze6hj44gruvu54vei.appsync-api.us-east-2.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-z2l7yqpts5dz5dn2ulgmywacxa", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})