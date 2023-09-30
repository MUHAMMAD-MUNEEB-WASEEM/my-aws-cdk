import React from "react"

import { render } from "@testing-library/react"
import Item from "../Item"

test("Item Component renders ID", () => {
    const comp = render(<Item
        title="My Api"
        id="example Id"
        description="This is the description"
    />)
    expect(comp.getByText("#example Id")).toBeVisible()

})
test("Item Component renders Title", () => {
    const comp = render(<Item
        title="My Api"
        id="example Id"
        description="This is the description"
    />)
    expect(comp.getByText("My Api")).toBeVisible()

})
test("Item Component renders Description", () => {
    const comp = render(<Item
        title="My Api"
        id="example Id"
        description="This is the description"
    />)
    expect(comp.getByText("This is the description")).toBeVisible()

})
test("Item Component render Details Button", () => {
    const comp = render(<Item
        title="My Api"
        id="example Id"
        description="This is the description"
    />)
    expect(comp.getByRole("button").textContent).toBe("Details")

})