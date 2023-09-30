import { Button, makeStyles } from '@material-ui/core'
import { navigate } from 'gatsby'
import React from 'react'


const useStyles = makeStyles({

    monitorButton: {
        backgroundColor: "#3072be",
        color: "white",
        padding: ".4rem",
        '&:hover': {
            backgroundColor: "#2a65a8",
        },
    },

})
const ApiSubscribedDetails = ({ location }) => {
    const classes = useStyles()
    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Your Subscribed Api Details:</h1>
                <Button onClick={() => navigate("monitoring")} className={classes.monitorButton}>
                    Monitoring
                </Button>
            </div>
            <br />
            <div>
                <h2>
                    Subscription ID : {location.state.subscriptionId}
                </h2>
                <br />
                <h2>Token :</h2>
                <h3 style={{ display: "inline", overflowWrap: 'break-word' }} >{location.state.token}</h3>
            </div>
        </div>
    )
}

export default ApiSubscribedDetails
