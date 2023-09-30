import { API } from 'aws-amplify'
import React, { useContext, useEffect, useState } from 'react'
import Item from '../components/Item'
import Layout from '../components/Layout'
import { identityContext } from '../context/authContext'
import { Router, navigate } from '@reach/router'
import ApiUnderDevComp from '../components/ApisUnderDevComp'
import DevApiDetail from '../components/DevApiDetail'
import { AuthState } from "@aws-amplify/ui-components"

const ApiUnderDev = () => {
    const { user, authState } = useContext(identityContext)
    if (!!authState && authState !== AuthState.SignedIn && !user) {
        navigate("/api-store/signin")
    }
    return (
        <Layout>
            <br />
            <Router basepath="/api-under-dev">
                <DevApiDetail path="/:id" />
                <ApiUnderDevComp path="/" user={user} />

            </Router>

        </Layout>
    )
}

export default ApiUnderDev
