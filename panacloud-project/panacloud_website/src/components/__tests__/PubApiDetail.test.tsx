import React from "react"

import { render } from "@testing-library/react"
import PubApiDetail from "../PubApiDetail"

test("PubApiDetail Component renders two heading", () => {
    const comp = render(<PubApiDetail
    />)
    expect(comp.getAllByRole("heading").length).toBe(2)
})

test("PubApiDetail Component renders Deatils heading", () => {
    const comp = render(<PubApiDetail
    />)
    expect(comp.getByText("Details :")).toBeVisible()
})
test("PubApiDetail Component renders Subscribe Button", () => {
    const comp = render(<PubApiDetail
    />)
    expect(comp.getByRole("button").textContent).toBe("Subscribe")
})
test("PubApiDetail Component renders Detail Component", () => {
    const comp = render(<PubApiDetail
    />)
    expect(comp.getByTestId("detailComp")).toBeVisible()
})