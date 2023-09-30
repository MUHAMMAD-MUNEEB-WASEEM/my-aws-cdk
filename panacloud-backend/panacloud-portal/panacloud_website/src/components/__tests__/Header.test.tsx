import React from "react"

import { render } from "@testing-library/react"
import Header from "../Header"
import { AuthState } from "@aws-amplify/ui-components"
// You have to write data-testid
import { identityContext } from "../../context/authContext"

test("Displays the Api Store Button", () => {
  const comp = render(<Header />)
  expect(comp.getByText("API Store")).toBeVisible()
})

test("Displays the Sign Out Button when Auth State is SignedIn", () => {
  const comp = render(
    <identityContext.Provider value={{
      user: {

      }, authState: AuthState.SignedIn
    }}>
      <Header />
    </identityContext.Provider>
  )
  expect(comp.getByText("Sign Out")).toBeVisible()
})

test("Displays the Sign In Button when Auth State is SignIn", () => {
  const comp = render(
    <identityContext.Provider value={{
      user: {

      }, authState: AuthState.SignIn
    }}>
      <Header />
    </identityContext.Provider>
  )
  expect(comp.getByText("Sign In")).toBeVisible()
})