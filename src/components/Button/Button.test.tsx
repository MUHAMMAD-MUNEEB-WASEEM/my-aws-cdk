import React from "react"
import { render } from "@testing-library/react"
import Button from "./"


test("Displays the Button with correct text", () => {
    const { getByText } = render(<Button>mateen</Button>)
    expect(getByText("mateen")).toBeVisible()
})