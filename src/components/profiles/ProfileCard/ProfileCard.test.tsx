import React from "react";
import ProfileCard from "./";
import { render } from "@testing-library/react";
import data from "./mockData";
describe("ProfileCard component", () => {
  let container;
  let testingData = data[0];
  beforeEach(() => {
    container = render(<ProfileCard {...testingData} />);
  });
  test("Render ProfileCard ", () => {
    expect(container).toBeTruthy();
  });
  test("Render User Image", () => {
    expect(container.getByAltText("Something")).toBeVisible();
  });
  test("Render User details", () => {
    expect(container.getByText("Something")).toBeVisible();
    expect(
      container.getByText("Head of Software Development at Panacloud Pvt Ltd")
    ).toBeVisible();
    expect(container.getByText("75 / USD Hour")).toBeVisible();
    expect(container.getByText("200")).toBeVisible();
  });
  test("Render Rating Component", () => {
    expect(container.getByTestId("rating")).toBeVisible();
  });
});
