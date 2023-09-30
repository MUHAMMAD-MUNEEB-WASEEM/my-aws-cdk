import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps, navigate } from "@reach/router"
import { API, graphqlOperation } from 'aws-amplify'
import { fetchApiDetails } from "../graphql/queries"
import { subscribeToApi } from "../graphql/mutations"
import DetailsComp from './DetailsComp'
import { Button, makeStyles } from '@material-ui/core'
import { identityContext } from '../context/authContext'
import { AuthState } from "@aws-amplify/ui-components"
import { createApi } from "../graphql/mutations"

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
    const subID = (data?.data?.subscribeToApi).slice(17)
    navigate(`${id}/${subID}`)
}
const PubApiDetail = ({ id, path }: any) => {
    const classes = useStyles()
    const { user, authState } = useContext(identityContext)
    if (!!authState && authState !== AuthState.SignedIn && !user) {
        navigate("/api-store/signin")
    }
    const publishApiFunc = async (devId, title, description, schema_uri, image_url) => {
        const data: any = await API.graphql({
            query: createApi,
            variables: { devId, title, description, schema_uri, image_url }
        })
        console.log(data)
    }
    const [data, setData]: any = useState([])
    const fetchDevApiDetail = async () => {
        const data: any = await API.graphql({
            query: fetchApiDetails,
            variables: { apiId: id }
        })
        setData(data?.data?.fetchApiDetails)
    }
    useEffect(() => {
        fetchDevApiDetail()
    }, [])
    console.log(data)
    return (
        <div style={{
            maxWidth: "80%",
            margin: "auto",
        }}>
            <div className={classes.head}>
                <h1>{data?.title}</h1>
                <Button onClick={() => publishApiFunc(user?.attributes?.sub, data?.title, data?.description, data?.schema_uri, data?.image_url)} className={classes.subscribeButton} size="small">Publish</Button>
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
