import React, { useContext, useEffect, useState } from "react"
import Item from "./Item"
import { fetchAllPublicApis } from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core"
import { navigate } from "@reach/router"
import { identityContext } from "../context/authContext"
import { AuthState } from "@aws-amplify/ui-components"

const useStyles = makeStyles({

  detailsButton: {
    backgroundColor: "#3072be",
    color: "white",
    padding: ".4rem",
    '&:hover': {
      backgroundColor: "#2a65a8",
    },
  },

})

const ApiStore = ({ path }) => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const { user, authState } = useContext(identityContext)
  const fetchAllPublicApisFunc = async () => {
    const data: any = await API.graphql(graphqlOperation(fetchAllPublicApis))
    setData(data?.data?.fetchAllPublicApis)
  }
  useEffect(() => {
    fetchAllPublicApisFunc()
  }, [])
  const redirectToRegisterApi = () => {
    if (!!authState && authState === AuthState.SignedIn && user) {
      navigate("/api-reg-dev")

    } else {
      navigate("signin")
    }
  }


  return (
    <div data-testId="ApiStoreComp" >
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
          Panacloud Apis
      </h1>
        <Button onClick={redirectToRegisterApi} className={classes.detailsButton}>Develop and Sell SAAS APIS</Button>
      </div>
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

export default ApiStore
