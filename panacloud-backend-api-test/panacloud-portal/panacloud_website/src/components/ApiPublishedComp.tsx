import React, { useContext, useEffect, useState } from 'react'
import Item from './Item'
import { fetchPublishedApisForDev } from "../graphql/queries"
import { API } from 'aws-amplify'
import { identityContext } from '../context/authContext'
import { navigate } from '@reach/router'
import { AuthState } from "@aws-amplify/ui-components"

const ApiPublishedComp = () => {
    const [data, setData]: any = useState([])
    const { user, authState } = useContext(identityContext)
    if (!!authState && authState !== AuthState.SignedIn && !user) {
        navigate("/api-store/signin")
    }
    const fetchPublishedApisForDevFunc = async () => {
        console.log(user?.attributes?.sub)

        const data: any = await API.graphql({
            query: fetchPublishedApisForDev,
            variables: { devId: user?.attributes?.sub },
        })
        console.log(data)
        setData(data.data.fetchPublishedApisForDev)
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
                    Your Published Apis
  </h1></div>
            <br />
            {
                data?.map(({ title, pk, description }) => (
                    <div key={pk}>
                        <Item title={title} id={pk} description={description} />
                        <br />
                    </div>))
            }
        </div>
    )
}

export default ApiPublishedComp
