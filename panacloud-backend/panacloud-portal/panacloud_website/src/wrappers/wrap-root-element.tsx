import React from "react"
import IdentityProvider from "../context/authContext"


export default ({ element }) => (
    <IdentityProvider>{element}</IdentityProvider>
)
