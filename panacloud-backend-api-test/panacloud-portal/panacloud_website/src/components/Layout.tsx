import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import React from 'react'
import Header from './Header'
import { Auth, Cache } from "aws-amplify"

if (typeof window !== "undefined") {
    var config = {
        storage: window.sessionStorage,
    }
}
const Layout = ({ children }) => {
    Cache.configure(config)

    return (
        <div>
            <Header />
            <AmplifyAuthenticator
                usernameAlias="email"
                style={{
                    display: "none",
                }}
            >
            </AmplifyAuthenticator>
            {children}
        </div>
    )
}

export default Layout
