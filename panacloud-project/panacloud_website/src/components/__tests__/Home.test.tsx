import React from "react"

import { render } from "@testing-library/react"
import Home from "../../pages/index"

test("Renders Home Page Heading", () => {
    const comp = render(<Home />)
    expect(comp.getByText("Home Page")).toBeVisible()
})

test("Renders Header on Home Page", () => {
    const comp = render(<Home />)
    expect(comp.getByTestId("Header")).toBeVisible()
})
