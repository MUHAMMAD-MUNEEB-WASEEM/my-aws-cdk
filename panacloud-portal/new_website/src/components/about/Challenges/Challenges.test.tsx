import React from "react";
import { Challenges } from "./";
import { render } from "@testing-library/react";
import mainPoints from "./MockData";

describe("Challenges component", () => {
  let container;
  beforeEach(() => {
    container = render(<Challenges mainPoints={mainPoints} />);
  });

  test("Renders Challenges", () => {
    expect(container).toBeTruthy();
  });
  test("Renders Challenges Title", () => {
    expect(container.getByText("Challenges We Face")).toBeVisible();
  });
  test("Render Bullet Points", () => {
    const mainComponent = container.baseElement.children
      .item(0)
      ?.childNodes.item(0);
    const gridComponent = mainComponent?.childNodes.item(1);
    expect(gridComponent).toBeTruthy();
  });
});
