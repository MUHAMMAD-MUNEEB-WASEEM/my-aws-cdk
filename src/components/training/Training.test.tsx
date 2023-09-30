import React from "react";
import { render } from "@testing-library/react";
import TrainingBody from ".";
import data from './MockData';

describe("Header component", () => {
    let container;
    beforeEach(()=>{
      container = render(
        <TrainingBody
        data={data}
        color="black"
        layout="tp3"
        />
      );
    })

    test("Renders Training Page", () => {   
      expect(container).toBeTruthy();
    });    

    test("Renders Title", () => {  
      expect(
       container.getByText("Learn to Build Serverless Software as a Service (SaaS) Interfaces and APIs")
      ).toBeInTheDocument();
    });

    test("Renders Training Programs", () => {  
    expect((data.allContentfulTraining.nodes[0].trainingProgram.length)).toEqual(3);
    });

    test("Renders Learn More Button", () => { 
      const btn = container.getAllByText("Learn More");      
      expect(btn.length).toEqual(3);
    });

    test("Renders Program preRequisites", () => {  
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[0]?.preRequisites[0])).toEqual("HTML");
    });

    test("Renders Program Outline", () => { 
      expect(data?.allContentfulTraining.nodes[0].trainingProgram[0].segments.length).toEqual(13);
    });

    test("Renders Program Outline", () => { 
      expect(data?.allContentfulTraining.nodes[0].trainingProgram[0].segments).toEqual(          
        expect.arrayContaining([      
          expect.objectContaining({   
            title: "Part IV: Testing React in TypeScript"
          })
        ])
      )            
    });

    test("Renders image", () => {
      expect(
        container.getByAltText("Learn to Build SaaS Interfaces and APIs")
      ).toBeVisible();
    });

});