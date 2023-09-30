import React from 'react'
import Layout from '../components/Layout'
import { Router } from "@reach/router"
import ApiSubscribedComp from '../components/ApiSubscribedComp'
import ApiSubscribedDetails from '../components/ApiSubscribedDetails'
import MonitorSubscribed from '../components/MonitorSubscribed'
import SubscribedApiDetails from '../components/SubscribedApiDetails'
const ApiSubscribed = () => {
    return (
        <Layout>
            <br />
            <Router basepath="/api-subscribed">
                <SubscribedApiDetails path="/:apiId/" />
                <ApiSubscribedDetails path="/:apiId/:subId/" />
                <MonitorSubscribed path="/:apiId/:subId/monitoring" />

                <ApiSubscribedComp path="/" />
            </Router>

        </Layout>
    )
}

export default ApiSubscribed
