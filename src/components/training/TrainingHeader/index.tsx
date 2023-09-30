import React, { FC } from 'react';
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../Styles";
import { Box } from '@material-ui/core';

export interface Props {  
    data: any;
    color: "grey" | "black";        
}

const TrainingHeader: FC<Props> = ({ data, color }) => {    
  const classes = useStyles();
  return (
    <Grid 
          container
          style={{textAlign:"center"}}
        >
          <Grid item xs={12} >
            <img 
              src={data.allContentfulTraining.nodes[0].image.file.url} 
              className={classes.image}
              alt="Learn to Build SaaS Interfaces and APIs"
            />
          </Grid>
          <Grid item xs={12} >
            <Box className={classes.headTitle}>               
              {data.allContentfulTraining.nodes[0].title}                
            </Box>  
          </Grid>
          <Grid item xs={12} >                      
            <Box  className={classes.subTitle} style={{color:color==="black"?"black":"grey"}}>
              {data.allContentfulTraining.nodes[0].subTitle} 
            </Box>           
          </Grid>
          <Grid item xs={12} >           
            <Box className={classes.headLine} style={{color:color==="black"?"grey":"black"}}>
              {data.allContentfulTraining.nodes[0].headline }
            </Box>          
          </Grid>
        </Grid>      
  )
}
export default TrainingHeader;
