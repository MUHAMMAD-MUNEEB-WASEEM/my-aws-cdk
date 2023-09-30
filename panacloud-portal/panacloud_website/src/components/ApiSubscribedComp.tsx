import React, { useContext, useEffect, useState } from 'react'
import Item from './Item'
import { fetchSubscriptionsWithDetails } from "../graphql/queries"
import { API } from 'aws-amplify'
import { identityContext } from '../context/authContext'
import { navigate } from '@reach/router'
import { AuthState } from "@aws-amplify/ui-components"
import SubscribedItem from './SubscribedItem'

const ApiSubscribedComp = () => {
    const [data, setData]: any = useState([])
    const { user, authState } = useContext(identityContext)
    if (!!authState && authState !== AuthState.SignedIn && !user) {
        navigate("/api-store/signin")
    }
    const fetchPublishedApisForDevFunc = async () => {
        console.log(user?.attributes?.sub)

        const data: any = await API.graphql({
            query: fetchSubscriptionsWithDetails,
            variables: { devId: user?.attributes?.sub },
        })
        setData(data.data.fetchSubscriptionsWithDetails)
    }

    useEffect(() => {
        fetchPublishedApisForDevFunc()
    }, [user?.attributes?.sub])
    return (
        <div>
            <div style={{
                minWidth: 275,
                maxWidth: "80%",
                margin: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1
                >
                    Your Subscribed Apis
</h1></div>
            <br />
            {
                data?.map(({ apiTitle, apiKey, apiId, subscriptionId, apiDescription, token }) => (
                    <div key={apiId}>
                        <SubscribedItem apiId={apiId} token={token} subscriptionId={subscriptionId} apiDescription={apiDescription} apiTitle={apiTitle} apiKey={apiKey} />
                        <br />
                    </div>))
            }
        </div>
    )
}

export default ApiSubscribedComp
