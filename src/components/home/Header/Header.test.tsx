import React from "react";
import PureHeader from "./PureHeader";
import { render } from "@testing-library/react";

describe("Header component", () => {
  let container;
  beforeEach(() => {
    container = render(
      <PureHeader
        data={{
          name: "Join the Next $1 Trillion Software Wave",
          mission: {
            mission: "Build Your\nAPI-First Unicorn\nStartup\n",
          },
          image: {
            file: {
              url:
                "//images.ctfassets.net/v4bcke0h1y2s/3L0VH9vSngypVVpM4a2Jdu/f4abe9e0c444d6fa77ae0573d146465a/maxresdefault.jpg",
            },
          },
        }}
      />
    );
  });
  test("Renders Header", () => {
    expect(container).toBeTruthy();
  });
  test("Renders Mission", () => {
    expect(
      container.getByText("Build Your API-First Unicorn Startup")
    ).toBeInTheDocument();
  });
  test("Renders Sub Title", () => {
    expect(
      container.getByText("Join the Next $1 Trillion Software Wave")
    ).toBeInTheDocument();
  });
  test("Renders image", () => {
    expect(
      container.getByAltText("Join the Next $1 Trillion Software Wave")
    ).toBeVisible();
  });
  test("Renders Button", () => {
    const button = container.getByText("Sign Up Now");
    expect(button).toBeVisible();
  });
});
