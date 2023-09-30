import React, { FC } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useStyles } from "../Styles";
import { navigate } from "gatsby-link";
    
export interface Props {  
  data: any;
  color: "grey" | "black";      
}

const TrainingProgram: FC<Props> = ({ data, color }) => {
  const { allContentfulTraining } = data;
  const classes = useStyles();
  return (
    <Grid
      className={classes.cardArea}
      container
      direction="row"
      justify="space-around"
      alignItems="center"
    >
      {allContentfulTraining.nodes[0].trainingProgram.map((v, i) => (
        <Grid key={i}>

          <Paper className={classes.paper} style={{border: `2px solid ${color}`}}> 
            <h3 style={{color:color}}>
              {v.title}
            </h3>
            <br/>            
            <div className={classes.programDiv}>
              <div><span style={{fontWeight:"bold"}}>Status: </span> 
                {v.status.status} 
              </div>
              <br/>
              <div><span style={{fontWeight:"bold"}}> Pre Requisites: </span> 
                {v.preRequisites.join(", ") } 
              </div>              
              <br/>
              {
                v.segments
                .sort((a, b) => (a.segmentNumber > b.segmentNumber ? 1 : b.segmentNumber > a.segmentNumber ? -1 : 0))
                .map((s,j) => (                
                <div key={j}> {s.title} </div>                                
                ))
              }
            </div>
            <br/><br/>
            <div style={{marginTop:20}}>
              <Button 
                variant="contained"               
                color="primary"             
                size="large"
                className={classes.btnStyle}
                onClick={()=>{navigate(v.slug)}}
              > 
                Learn More 
              </Button>
            </div>
          </Paper>           
        </Grid>
      ))} 
    </Grid>        
  )
}
export default TrainingProgram;
