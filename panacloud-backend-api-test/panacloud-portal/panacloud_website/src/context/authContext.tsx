import React, { useEffect, useState, createContext } from "react"
import Amplify from "aws-amplify"
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import awsmobile from "../aws-exports"

Amplify.configure(awsmobile)
console.log(Amplify.configure(awsmobile))
interface initialVal {
  authState: AuthState | undefined
  user: any
}

export const identityContext = createContext<initialVal>({
  authState: undefined,
  user: undefined,
})

const IdentityProvider = props => {
  const [authState, setAuthState] = useState<AuthState>()
  const [user, setUser] = useState<object | undefined>()
  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return (
    <identityContext.Provider value={{ user: user, authState: authState }}>
      {props.children}
    </identityContext.Provider>
  )
}

export default IdentityProvider
