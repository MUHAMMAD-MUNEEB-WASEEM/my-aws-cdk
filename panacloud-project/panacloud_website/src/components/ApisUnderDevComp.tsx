
import React, { useContext, useEffect, useState } from 'react'
import Item from './Item'
import { fetchUnderdevelopmentApisForDev } from "../graphql/queries"
import { API } from 'aws-amplify'
import { identityContext } from '../context/authContext'
import { navigate } from '@reach/router'
import { AuthState } from "@aws-amplify/ui-components"

const ApisUnderDev = ({ path }: any) => {
    const [data, setData]: any = useState([])
    const { user, authState } = useContext(identityContext)
    if (!!authState && authState !== AuthState.SignedIn && !user) {
        navigate("/api-store/signin")
    }

    const fetchUnderdevelopmentApisForDevFunc = async () => {
        const data: any = await API.graphql({
            query: fetchUnderdevelopmentApisForDev,
            variables: { devId: user?.attributes?.sub },
        })
        setData(data.data.fetchUnderdevelopmentApisForDev)
    }

    useEffect(() => {
        fetchUnderdevelopmentApisForDevFunc()
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
                    Your under development Apis
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

export default ApisUnderDev