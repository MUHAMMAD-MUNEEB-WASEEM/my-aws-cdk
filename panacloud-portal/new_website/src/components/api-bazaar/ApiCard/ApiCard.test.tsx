import React from "react";
import { render, } from "@testing-library/react";
import ApiCard from "./";
import mockData from "./mockData";

const testingData = mockData[0];

describe("Test ApiCard", () => {

    it("checking for the desire hierarchy of element nodes", async () => {
        const { baseElement } = render(<ApiCard {...testingData} />);
        const container = baseElement.children.item(0)?.childNodes.item(0)

        /* checking number of child nodes in the main container element  */
        expect(container?.childNodes.length).toBe(2);

        /* checking number of child nodes in the apiContent element  */
        const apiContent = container?.childNodes.item(1);
        expect(apiContent?.childNodes.length).toBe(4);

        /* checking number of child nodes in the apiRating element  */
        const apiRating = apiContent?.childNodes.item(3);
        expect(apiRating?.childNodes.length).toBe(3);
    })


    it('Checking if the props passed set properly', async () => {
        const { baseElement } = render(<ApiCard {...testingData} />);
        const container = baseElement.children.item(0)?.childNodes.item(0);
        const apiContent = container?.childNodes.item(1);
        const { apiKind, ownerName, publishDate, ratings, title } = testingData;

        expect(apiContent?.childNodes.item(0).textContent).toBe(title);
        expect(apiContent?.childNodes.item(1).textContent).toBe(`By ${ownerName} | ${new Date(publishDate!).toDateString()}`);
        expect(apiContent?.childNodes.item(2).textContent).toBe(`Type: ${apiKind}`);
        expect(apiContent?.childNodes.item(3).textContent).toBe(ratings?.length.toString());

        // console.log(apiContent?.childNodes.item(3).textContent);

    });


})
