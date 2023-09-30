import React from "react";
import Home from "./index";
import { render } from "@testing-library/react";
import * as Gatsby from "gatsby";
import { data } from "./mockData";

describe("Home page", () => {
  let container;
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      data: {
        allContentfulCompanyWebsite: {
          nodes: [
            {
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
            },
          ],
        },
      },
    }));
    container = render(<Home data={data} />);
  });
  test("Render Home Page", () => {
    expect(container).toBeTruthy();
  });
  test("Renders Header component", () => {
    expect(container.getByTestId("header")).toBeVisible();
  });
  test("Renders Card component", () => {
    expect(container.getByTestId("card")).toBeVisible();
  });
});
