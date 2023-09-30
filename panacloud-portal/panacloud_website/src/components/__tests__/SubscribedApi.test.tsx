import React from "react"

import { render } from "@testing-library/react"
import SubscribedApi from "../SubscribedApi"

test("SubscribedApiComponent renders four headings", () => {
    const comp = render(<SubscribedApi
        location={{ state: { apiKey: "edfasfz", jwt: "eadfaf" } }}
    />)
    expect(comp.getAllByRole("heading").length).toBe(4)
})

test("SubscribedApiComponent renders you are subscribed heading", () => {
    const comp = render(<SubscribedApi
        location={{ state: { apiKey: "edfasfz", jwt: "eadfaf" } }}
    />)
    expect(comp.getByText("You are Subscribed!!!!!")).toBeVisible()
})

test("SubscribedApiComponent renders Token heading", () => {
    const comp = render(<SubscribedApi
        location={{ state: { apiKey: "edfasfz", jwt: "eadfaf" } }}
    />)
    expect(comp.getByText("Token :")).toBeVisible()
})
test("SubscribedApiComponent renders Token heading", () => {
    const comp = render(<SubscribedApi location={{ state: { apiKey: "edfasfz", jwt: "eadfaf" } }}
    />)
    expect(comp.getByText("API Key : edfasfz")).toBeVisible()
})
