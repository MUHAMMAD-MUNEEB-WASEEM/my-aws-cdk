import React from "react";
import Sidepane from "./";
import { render } from "@testing-library/react";

describe("Sidepane component", () => {
  let container;
  beforeEach(() => {
    container = render(<Sidepane />);
  });
  test("Render Sidepane ", () => {
    expect(container).toBeTruthy();
  });
  test("Render List of filter", () => {
    expect(container.getByTestId("list")).toBeVisible();
  });
  test("Render filter details", () => {
    expect(container.getByText("All developers")).toBeVisible();
    expect(container.getByText("10")).toBeVisible();
  });
});
