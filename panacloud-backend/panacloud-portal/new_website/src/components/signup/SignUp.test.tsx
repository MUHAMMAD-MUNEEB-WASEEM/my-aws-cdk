import React from "react";
import { useStaticQuery } from "gatsby";
import { render } from "@testing-library/react";
import SignUP from ".";
import mockData from "./mockData";

describe("CreateAccount Render Component", () => {
  beforeEach(() => {
    //@ts-ignore
    useStaticQuery.mockReturnValue({ ...mockData });
  });

  it("renders correctly", async () => {
    const { getByTestId } = await render(<SignUP />);
    expect(getByTestId("signup")).toBeInTheDocument();
  });
});
