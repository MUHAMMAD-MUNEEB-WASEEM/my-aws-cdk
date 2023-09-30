import React from "react"
import { render } from "@testing-library/react"
import ApiStoreComp from "../ApiStore"

test("Api Store Component render Panacloud Apis Heading", () => {
    const comp = render(<ApiStoreComp />)
    expect(comp.getByText("Panacloud Apis")).toBeVisible()
})
test("Api Store Component contains Button with Develop and Sell SAAS APIs title", () => {
    const comp = render(<ApiStoreComp />)
    expect(comp.getByRole("button").textContent).toBe("Develop and Sell SAAS APIS")
})
