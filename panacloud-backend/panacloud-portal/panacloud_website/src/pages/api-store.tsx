import React from "react"
import ApiStore from "../components/ApiStore"
import Layout from "../components/Layout"
import Login from "../components/Login"
import { Router } from "@reach/router"
import PubApiDetail from "../components/PubApiDetail"
import SubscribedApi from "../components/SubscribedApi"

const Store = () => {
  return (
    <Layout>
      <br />
      <Router basepath="/api-store">
        <Login path="/signin" />
        <ApiStore path="/" />
        <PubApiDetail path="/:id" />
        <SubscribedApi path="/:id/:sbid" />
      </Router>
    </Layout>
  )
}

export default Store
