import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps, navigate } from "@reach/router"
import { API, graphqlOperation } from 'aws-amplify'
import { fetchApiDetails } from "../graphql/queries"
import { subscribeToApi } from "../graphql/mutations"
import DetailsComp from './DetailsComp'
import { Button, makeStyles } from '@material-ui/core'
import { identityContext } from '../context/authContext'
import { AuthState } from "@aws-amplify/ui-components"

const useStyles = makeStyles({
    head: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    subscribeButton: {
        backgroundColor: "#3072be",
        color: "white",
        padding: ".4rem",
        '&:hover': {
            backgroundColor: "#2a65a8",
        },
    },

})
const subscribeApi = async (id, sub) => {
    const data: any = await API.graphql({
        query: subscribeToApi,
        variables: { apiId: id, devId: sub }
    })
    const { data: { subscribeToApi: { apiKey, subscriptionId, jwt } } } = data

    navigate(`/api-subscribed/${id}/${subscriptionId}`, { state: { token: jwt, apiKey, subId: subscriptionId } })
}
const PubApiDetail = ({ id, path }: any) => {
    const classes = useStyles()
    const { user, authState } = useContext(identityContext)

    const [data, setData]: any = useState([])
    const fetchAllPublicApisFunc = async () => {
        const data: any = await API.graphql({
            query: fetchApiDetails,
            variables: { apiId: id }
        })
        setData(data?.data?.fetchApiDetails)
    }
    useEffect(() => {
        fetchAllPublicApisFunc()
    }, [])
    const handleSubscribe = () => {
        if (!!authState && authState === AuthState.SignedIn && user) {
            subscribeApi(id, user?.attributes?.sub)
        } else {
            navigate("/api-store/signin")

        }
    }
    console.log(data)
    return (
        <div style={{
            maxWidth: "80%",
            margin: "auto",
        }}>
            <div className={classes.head}>
                <h1>{data?.title}</h1>
                <Button onClick={handleSubscribe} className={classes.subscribeButton} size="small">Subscribe</Button>
            </div>
            <br />
            <br />
            <h2>Details : </h2>
            <br />
            <DetailsComp title={data?.title} description={data?.description} visibility={data?.pk1} type={data?.type} id={data?.pk} schema_uri={data?.schema_uri} />
        </div>
    )
}

export default PubApiDetail
