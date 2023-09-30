import React from "react"
import { render } from "@testing-library/react"
import ApisUnderDevComp from "../ApisUnderDevComp"

test("Api Under Development Component renders your under development apis heading", () => {
    const comp = render(<ApisUnderDevComp />)
    expect(comp.getByText("Your under development Apis")).toBeVisible()
})


