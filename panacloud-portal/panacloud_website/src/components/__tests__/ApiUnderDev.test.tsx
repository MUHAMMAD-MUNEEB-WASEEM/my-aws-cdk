import React from "react"
import { render } from "@testing-library/react"
import ApiUnderDevPage from "../../pages/api-under-dev"
test("Api Store page renders Header", () => {
    const comp = render(<ApiUnderDevPage />)
    expect(comp.getByTestId("Header")).toBeVisible()
})