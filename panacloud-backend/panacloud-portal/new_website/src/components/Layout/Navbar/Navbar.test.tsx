import React from "react";
import { render, } from "@testing-library/react";
import Navbar from "./";
// import PureNavBar from "./PureNavBar";
import mockData from './mockData';
import { useStaticQuery } from 'gatsby';

// jest.mock('gatsby', () => {
//     const modules = jest.requireActual("gatsby");
//     return {
//         __esModules: true,
//         ...modules,
//         useStaticQuery: jest.fn(),
//         graphql: jest.fn(),
//     }
// })

describe("Testing Navbar", () => {

    /* mock useStaticQuery for each Navbar */
    beforeEach(() => {
        // @ts-ignore
        useStaticQuery.mockReturnValue({ ...mockData });
    })

    it("should be render Navbar", async () => {
        const navbar = render(<Navbar />);
        expect(navbar).toBeTruthy();
    })


    // it("should have 3 child element", async () => {
    //     const { debug, baseElement, getByTestId } = render(<Navbar />);
    //     const rootElement = baseElement.childNodes.item(0).childNodes.item(0);

    //     expect(rootElement.childNodes.length).toBe(3);

    //     console.log("getByTestId ==> ", getByTestId('pure-navbar').textContent);
    // })


    // it('Navbar should render ')

})