import React, { useContext, useEffect, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import { identityContext } from "../context/authContext"
import { Auth, Cache } from "aws-amplify"
import {
  AmplifyAuthenticator,
  AmplifyForgotPassword,
  AmplifyLabel,
  AmplifySignIn,
  AmplifySignUp,
  AmplifyToast,
} from "@aws-amplify/ui-react"
import { navigate } from "@reach/router"
import { Button, IconButton, Snackbar } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import { AuthState } from "@aws-amplify/ui-components"

if (typeof window !== "undefined") {
  var config = {
    storage: window.sessionStorage,
  }
}
const UserLogin: React.FC<RouteComponentProps> = () => {
  const { user, authState } = useContext(identityContext)
  console.log(user)
  if (!!authState && authState === AuthState.SignedIn && user) {
    navigate("/api-store")
  }
  Cache.configure(config)

  return (
    <div>
      <AmplifyAuthenticator
        usernameAlias="email"

      >
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: "name",
              label: "Name",
              placeholder: "Enter your name",
              required: true,
            },
            {
              type: "email",
              label: "Email",
              placeholder: "Enter your email address",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              placeholder: "Enter your password",
              required: true,
            },
            {
              type: "phone_number",
              label: "Phone",
              placeholder: "Enter your phone number",
              required: true,
            },
            {
              type: "address",
              label: "Address",
              placeholder: "Enter your address",
              required: true,
            },
          ]}
        />
      </AmplifyAuthenticator>
    </div>
  )
}

export default UserLogin
