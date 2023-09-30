import React from "react";
import OperationUnicorn from "./";
import { render } from "@testing-library/react";
import * as Gatsby from "gatsby";

describe("Operation unicorn component", () => {
  let container;
  beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
    useStaticQuery.mockImplementation(() => ({
      
    allContentfulOperationUnicorn: {
        edges: [{
        node: 
          {
            order: 1,
            
            title: "Operation Unicorn: A Movement to Transform Individuals, Societies and Countries",
            description:{
                description : "Panacloud has started and is leading a social movement called #OperationUnicorn to help anyone and everyone become a cloud developer, a startup founder, and participant in the API economy. The focus is on building API-First startups, which will in time become billion dollar companies. This movement is striving to build a community that will not only transform individuals, but societies and countries as well."
            },
            images:[{
                fluid:{
                    src: "//images.ctfassets.net/v4bcke0h1y2s/5ch0GoC2ygxwOMzgglrsRA/042a90f07881803c69e7eff1be8b0019/operation-unicorn.png"
                },
                title:"operation-unicorn"
            }],
            },
        
        }],
      },
    }));
    container = render(<OperationUnicorn />);
  });


    test("Renders Operation Unicorn", () => {
        expect(container).toBeTruthy();
    });


    test("Renders Operation unicorn Page Title", () => {
      expect(
        container.getByText(
          "Operation Unicorn: A Movement to Transform Individuals, Societies and Countries"
        )
      ).toBeVisible();
    });


    test("Renders Operation unicorn Page Description", () => {
        expect(
          container.getByText(
            "Panacloud has started and is leading a social movement called #OperationUnicorn to help anyone and everyone become a cloud developer, a startup founder, and participant in the API economy. The focus is on building API-First startups, which will in time become billion dollar companies. This movement is striving to build a community that will not only transform individuals, but societies and countries as well."
          )
        ).toBeVisible();
      });

    test("Renders Operation unicorn Page Image", () => {
        expect(
          container.getByAltText('operation-unicorn')
        ).toBeVisible();
      });

});