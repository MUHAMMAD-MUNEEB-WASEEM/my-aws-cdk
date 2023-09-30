import { Router } from '@reach/router'
import React from 'react'
import Layout from '../components/Layout'
import ApiPublishedComp from "../components/ApiPublishedComp"
import DevPublishedApiDetail from '../components/DevPublishedApiDetail'
import Monitor from '../components/Monitor'
const ApiPublished = () => {
    return (
        <Layout>
            <br />
            <Router basepath="/api-published">
                <Monitor path="/:id/monitoring" />
                <DevPublishedApiDetail path="/:id" />
                <ApiPublishedComp path="/" />

            </Router>

        </Layout>
    )
}

export default ApiPublished
