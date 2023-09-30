import React, { FC } from 'react';

import { default as TP1 } from "./ProgramTemplate1";
import { default as TP2 } from "./ProgramTemplate2";
import { default as TP3 } from "./ProgramTemplate3";

export interface Props {  
  data: any;
  color: "grey" | "black";
  layout: "tp1" | "tp2" | "tp3";
}

const TrainingProgram: FC<Props> = ({ data, color, layout }) => {
  return (
    layout === 'tp1' 
      ? <TP1 data={data}  color={color}/> 
      : layout === 'tp2' 
        ? <TP2 data={data}  color={color}/>
        : <TP3 data={data}  color={color}/>       
  )
}
export default TrainingProgram;
