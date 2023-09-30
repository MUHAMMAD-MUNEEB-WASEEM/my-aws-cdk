import React, { useContext, useEffect, useState } from 'react'
import { navigate } from "gatsby"
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
const DevPublishedApiDetail = ({ id }) => {
    const classes = useStyles()
    const { user, authState } = useContext(identityContext)
    if (!!authState && authState !== AuthState.SignedIn && !user) {
        navigate("/api-store/signin")
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
    return (
        <div style={{
            maxWidth: "80%",
            margin: "auto",
        }}>
            <div className={classes.head}>
                <h1>{data?.title}</h1>
                <Button onClick={() => navigate("monitoring")} className={classes.subscribeButton} size="small">Monitoring</Button>
            </div>
            <br />
            <br />
            <h2>Details : </h2>
            <br />
            <DetailsComp title={data?.title} description={data?.description} visibility={data?.pk1} type={data?.type} id={data?.pk} schema_uri={data?.schema_uri} />
        </div>
    )
}
export default DevPublishedApiDetail