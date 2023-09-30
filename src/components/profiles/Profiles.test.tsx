import React from "react";
import Profiles from "./";
import { render } from "@testing-library/react";

describe("Profile Page", () => {
  let container;
  beforeEach(() => {
    container = render(<Profiles />);
  });
  test("Render Profile Page", () => {
    expect(container).toBeTruthy();
  });
  test("Render Heading", () => {
    expect(container.getByText("Serverless SaaS Cloud Developers")).toBeVisible();
  });
  test("Render components", () => {
    expect(container.getByTestId("sidepane")).toBeVisible();
    expect(container.getByTestId("profiles")).toBeVisible();
    expect(container.getByTestId("pagination")).toBeVisible();
    expect(container.getByTestId("input")).toBeVisible();
  });
});
