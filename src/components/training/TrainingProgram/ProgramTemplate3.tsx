import React, { FC } from 'react';
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../Styles";
import TrainingProgramCard  from './Card';

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
          <TrainingProgramCard 
            title={v.title} 
            imageUrl={v.titleImage.file.url}
            status={v.status.status} 
            preReq={v.preRequisites.join(", ")} 
            outline={v.segments}
            slug={v.slug}
            />
        </Grid>
      ))} 
    </Grid>        
  )
}
export default TrainingProgram;
