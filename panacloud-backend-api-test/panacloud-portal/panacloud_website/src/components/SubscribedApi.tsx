import { Button, makeStyles } from '@material-ui/core'
import { API } from 'aws-amplify'
import { navigate } from "gatsby"
import React, { useEffect, useState } from 'react'
import { getTokenForKey } from "../graphql/queries"
const useStyles = makeStyles({
    head: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    monitorButton: {
        backgroundColor: "#3072be",
        color: "white",
        padding: ".4rem",
        '&:hover': {
            backgroundColor: "#2a65a8",
        },
    },

})

const SubscribedApi = ({ location }) => {
    console.log(location.state)
    const classes = useStyles()
    const [token, setToken] = useState()
    const handleMonitor = () => {
        navigate(`monitor`)
    }

    return (
        <div style={{ padding: "1rem" }}>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>You are Subscribed!!!!!</h1>

                <Button onClick={handleMonitor} className={classes.monitorButton} variant="contained">Monitoring</Button>
            </div>
            <br />
            <h2>API Key : {location.state.apiKey}</h2>
            <br />
            <h2>Token :</h2>
            <h3 style={{ display: "inline", overflowWrap: 'break-word' }} >{location.state.jwt}</h3>
        </div >
    )

}

export default SubscribedApi
