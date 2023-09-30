import React from "react"

import { render } from "@testing-library/react"
import DevApiDetail from "../DevApiDetail"

test("DevApiDetail Component renders two heading", () => {
    const comp = render(<DevApiDetail
    />)
    expect(comp.getAllByRole("heading").length).toBe(2)
})

test("DevApiDetail Component renders Deatils heading", () => {
    const comp = render(<DevApiDetail
    />)
    expect(comp.getByText("Details :")).toBeVisible()
})
test("DevApiDetail Component renders Publish Button", () => {
    const comp = render(<DevApiDetail
    />)
    expect(comp.getByRole("button").textContent).toBe("Publish")
})
test("DevApiDetail Component renders Detail Component", () => {
    const comp = render(<DevApiDetail
    />)
    expect(comp.getByTestId("detailComp")).toBeVisible()
})