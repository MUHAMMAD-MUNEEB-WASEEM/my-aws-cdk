import React, { FC } from 'react'
import Container from "@material-ui/core/Container";
import TrainingProgram from './TrainingProgram';
import TrainingHeader from './TrainingHeader';
import { useStyles } from "./Styles";  

export interface Props {  
  data: any;
  color: "grey" | "black";
  layout: "tp1" | "tp2" | "tp3";
}

const Training: FC<Props> = ({data, color, layout}) => {
    
  const classes = useStyles();    
  return (
    <div className={classes.root}>       
      <Container maxWidth="xl">           
        <TrainingHeader data={data} color={color}/>
        <TrainingProgram data={data} color={color} layout={layout}/>               
      </Container>
    </div>                 
  )
}
export default Training