import React from "react";
import CardFeatures from "./";
import { render } from "@testing-library/react";

describe("CardFeatures component", () => {
  let container;
  beforeEach(() => {
    container = render(
      <CardFeatures
        display='wider'
        title="Monitor Resource Usage"
        description="A platform for measuring and monitoring usage-based billing of cloud resources for multi-tenant Serverless SaaS APIs"
        icon="//images.ctfassets.net/v4bcke0h1y2s/5rTs26QW028Gpu52JQXfr6/8dcdb44c06d6ababec8c7b328da38a9f/gauge.png"
      />
    );
  });

  test("Renders Card", () => {
    expect(container).toBeTruthy();
  });
  test("Renders Card Description", () => {
    expect(container.getByText("Monitor Resource Usage")).toBeVisible();
  });
  test("Renders Card Title", () => {
    expect(
      container.getByText(
        "A platform for measuring and monitoring usage-based billing of cloud resources for multi-tenant Serverless SaaS APIs"
      )
    ).toBeVisible();
  });
  test("Renders icon", () => {
    expect(container.getByAltText("Monitor Resource Usage")).toBeVisible();
  });
});
