import React from "react";
import About from "./";
import { render } from "@testing-library/react";
import * as Gatsby from "gatsby";

describe("About component", () => {
  let container;
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      allContentfulAbout: {
        nodes: [
          {
            title:
              "Panacloud is a SaaS platform and ecosystem for the Application Programming Interface (API) Economy",
          },
        ],
      },
      allContentfulAboutSection: {
        nodes: [
          {
            order: 1,
            description: {
              description:
                "Panacloud is a platform and ecosystem for the Application Programming Interface (API) Economy. APIs are software interfaces that allow once separate software systems to seamlessly and easily talk to each other.  The innovative power of APIs has lead to the realization that Software-as-a-Service (SaaS) applications can be built by combining APIs built by specialized API providers. That, in turn, has created the API Economy, which empowers developers to specialize and monetize their skills and domain knowledge. ",
            },
            title: "About Us",
            image: {
              file: {
                url:
                  "//images.ctfassets.net/v4bcke0h1y2s/5Wguk09bxekqvyNbfQruhG/5074f5c9485f219fc07c2ef6ede409b0/panacloud-flag.gif",
              },
            },
          },
        ],
      },
    }));
    container = render(<About />);
  });

  /* test if the main container is visible */
  test("Renders About", () => {
    expect(container).toBeTruthy();
  });

  /* test if the title is visible */
    test("Renders About Page Title", () => {
      expect(
        container.getByText(
          "Panacloud is a SaaS platform and ecosystem for the Application Programming Interface (API) Economy"
        )
      ).toBeVisible();
    });

  /* test if the div for body containers is visible */
    test("Render Containers", () => {
      const mainComponent = container.baseElement.children
        .item(0)
        ?.childNodes.item(0);
      const parentOfContainerComponents = mainComponent?.childNodes.item(1);
      expect(parentOfContainerComponents).toBeTruthy();
    });
});
