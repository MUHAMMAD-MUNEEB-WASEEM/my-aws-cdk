import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { navigate } from "@reach/router"
import { Link } from "gatsby"
import { Auth, Cache } from "aws-amplify"
import { AuthState } from "@aws-amplify/ui-components"
import { identityContext } from "../context/authContext"
import { AmplifyAuthenticator } from "@aws-amplify/ui-react"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    width: "70px",
  },
  bar: {
    backgroundColor: "#3072be",
  },
  title: {
    flexGrow: 1,
  },
}))

const redirectToStore = () => {
  navigate("/api-store/")
}
const redirectToSignIn = () => {
  navigate("/api-store/signin")
}
function signOut() {
  Cache.clear()
  Auth.signOut()
}

export default function ButtonAppBar() {
  const classes = useStyles()
  const { user, authState } = useContext(identityContext)
  console.log(user)
  return (
    <div className={classes.root} data-testid="Header">
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <div className={classes.title}>
            <Link to="/">
              <img
                className={classes.logo}
                src="https://www.panacloud.ai/assets/images/global/logo-color.png"
              />
            </Link>
          </div>

          <Button onClick={redirectToStore} color="inherit">
            API Store
          </Button>
          {!!authState && authState === AuthState.SignedIn && user ? (
            <Button onClick={signOut} color="inherit">
              Sign Out
            </Button>
          ) : (
              <Button onClick={redirectToSignIn} color="inherit">
                Sign In
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
