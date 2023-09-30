import React, { useContext } from "react"
import Header from "../components/Header"
import Layout from "../components/Layout"
import { Auth, Cache } from "aws-amplify"
import { AmplifyAuthenticator } from "@aws-amplify/ui-react"

if (typeof window !== "undefined") {
  var config = {
    storage: window.sessionStorage,
  }
}
export default function Home() {
  Cache.configure(config)

  return (
    <Layout>

      <h1>Home Page</h1>
    </Layout>
  )
}
