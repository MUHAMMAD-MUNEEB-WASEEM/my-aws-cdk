import React, { FC } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useStyles } from "../Styles";
import { navigate } from "gatsby-link";
import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core';

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
          <Card className={classes.cardRoot}>          
          <CardMedia
            className={classes.media}
            image={v.titleImage.file.url}
            title="bootcamp programs and details"
          />      
          <CardContent style={{height:100}}>
            <h3 style={{color: color}}>
              {v.title}
            </h3>
            <br/>
            </CardContent>
          <CardContent style={{height:100}}>                     
            <div><span style={{fontWeight:"bold"}}>Status: </span> 
              {v.status.status} 
            </div>
            <br/>
            <div><span style={{fontWeight:"bold"}}> Pre Requisites: </span> 
              {v.preRequisites.join(", ") } 
            </div>  
          </CardContent>
         
          <CardContent style={{height:350}}>                                      
            {
              v.segments
                .sort((a, b) => (a.segmentNumber > b.segmentNumber ? 1 : b.segmentNumber > a.segmentNumber ? -1 : 0))
                .map((s,j) => (                
                <div key={j}> {s.title} </div>                                
                ))
            }        
            </CardContent>
          
          <CardContent className={classes.container}>                  
              <CardActions disableSpacing >    
                <Button 
                  variant="contained"               
                  color="primary"             
                  size="large"
                  className={classes.btnholder}
                  onClick={()=>{navigate(v.slug)}}
                > 
                  Learn More 
                </Button>
              </CardActions>
            </CardContent>          
          </Card>
        </Grid>
      ))} 
    </Grid>        
  )
}
export default TrainingProgram;
