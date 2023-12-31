import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { navigate } from "gatsby"

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: "80%",
        margin: "auto",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    detailsButton: {
        backgroundColor: "#3072be",
        color: "white",
        padding: ".4rem",
        '&:hover': {
            backgroundColor: "#2a65a8",
        },
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

export default function OutlinedCard({ apiTitle, apiKey, apiId, subscriptionId, apiDescription, token }) {
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>
    const handleClickDetails = () => {
        navigate(apiId, { state: { token, apiKey, subscriptionId } })
    }
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    #{apiId}
                </Typography>
                <Typography variant="h5" component="h2">
                    {apiTitle}
                </Typography>
                <Typography variant="body2" component="p">
                    {apiDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={handleClickDetails}
                    className={classes.detailsButton} size="small">
                    Details
        </Button>
            </CardActions>
        </Card>
    )
}
