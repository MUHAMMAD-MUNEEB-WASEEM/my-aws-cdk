import React from "react";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./Styles";
import CardFeatures from "../Cards";
import Header from "../Header";

const Home = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Grid
        className={classes.cardArea}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        data-testid="card"
      >
        {data &&
          data.allContentfulCardFeatures.nodes.map((v, i) => (
            <Grid key={i}>
              <CardFeatures
                display="wider"
                icon={v.icon.file.url}
                title={v.title}
                description={v.description.description}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
export default Home;
