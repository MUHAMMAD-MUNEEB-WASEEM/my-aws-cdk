import React from "react"
import { render } from "@testing-library/react"
import ApiRegDev from "../../pages/api-reg-dev"

test("ApiRegDev Page renders Register Api Heading", () => {
    const comp = render(<ApiRegDev />)
    expect(comp.getByText("Register API")).toBeVisible()
})
test("ApiRegDev Page renders Header", () => {
    const comp = render(<ApiRegDev />)
    expect(comp.getByTestId("Header")).toBeVisible()
})

test("ApiRegDev Page renders 4 text boxes", () => {
    const comp = render(<ApiRegDev />)
    expect(comp.getAllByRole("textbox").length).toBe(4)
})
test("ApiRegDev Page renders 2 buttons with correct Label", () => {
    const comp = render(<ApiRegDev />)
    expect(comp.getByText("Register")).toBeVisible()
})
