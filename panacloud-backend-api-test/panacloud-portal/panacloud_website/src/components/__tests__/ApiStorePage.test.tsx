import React from "react"
import { render } from "@testing-library/react"
import ApiStorePage from "../../pages/api-store"
test("Api Store page renders Header", () => {
    const comp = render(<ApiStorePage />)
    expect(comp.getByTestId("Header")).toBeVisible()
})