import React from "react";
import { render } from "@testing-library/react";
import TrainingProgram from ".";

import data from '../MockData';
describe("Header component", () => {
    let container;
    beforeEach(()=>{
      container = render(
        <TrainingProgram
        data={data}
        color="black"
        layout="tp3"
        />
      );
    })

    test("Renders Training Program", () => {   
      expect(container).toBeTruthy();
    });

    test("Renders Training Programs", () => {  
    expect((data.allContentfulTraining.nodes[0].trainingProgram.length)).toEqual(3);
    });

    test("Renders Learn More Button", () => { 
      const btn = container.getAllByText("Learn More");
      expect(btn[0]).toBeInTheDocument();
      expect(btn[1]).toBeInTheDocument();
      expect(btn[2]).toBeInTheDocument();
    });

    test("Renders Program preRequisites", () => {  
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[0]?.preRequisites[0])).toEqual("HTML");
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[0]?.preRequisites[1])).toEqual("CSS");
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[0]?.preRequisites[2])).toEqual("JavaScript");
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[1]?.preRequisites[0])).toEqual("Python");
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[1]?.preRequisites[1])).toEqual("TypeScript");
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[1]?.preRequisites[2])).toEqual("Rust");
    });
    
    test("Renders Program status", () => {  
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[0]?.status)).toEqual({"status": "Streaming Completed, Recording Available, Project Submissions in Progress"});
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[1]?.status)).toEqual({"status": "bootCamp will start on saturday, May 22, 2021"});
      expect((data?.allContentfulTraining.nodes[0].trainingProgram[2]?.status)).toEqual({"status": "Under Development "});      
    });

});