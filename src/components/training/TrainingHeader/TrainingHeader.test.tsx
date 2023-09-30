import React from "react";
import { render } from "@testing-library/react";
import TrainingHeader from ".";
import data from '../MockData';

describe("Header component", () => {
    let container;
    beforeEach(()=>{
      container = render(
        <TrainingHeader
        data={data}
        color="black"        
        />
      );
    })

    test("Renders Training Header", () => {   
      expect(container).toBeTruthy();
    });    

    test("Renders Title", () => {  
      expect(
       container.getByText("Learn to Build Serverless Software as a Service (SaaS) Interfaces and APIs")
      ).toBeInTheDocument();
    });
    
    test("Renders Sub Title", () => {   
      expect(
        container.getByText("Build Your API-First Unicorn")
      ).toBeInTheDocument();
    });

    test("Renders Headline", () => {
      expect(
        container.getByText("Three Tracks of Project Based Serverless SaaS Training")
      ).toBeVisible();
    });

    test("Renders image", () => {
      expect(
        container.getByAltText("Learn to Build SaaS Interfaces and APIs")
      ).toBeVisible();
    });

});