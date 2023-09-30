import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { useStyles } from "./Styles";
import { navigate } from "gatsby-link";

export interface Props {
  data: {
    name: string;
    mission: {
      mission: string;
    };
    image: {
      file: {
        url: string;
      };
    };
  };
}

const PureHeader: FC<Props> = ({ data }) => {
  const classes = useStyles();
  return data != null ? (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <div className={classes.top}>
            <div className={classes.subheading}>{data.name}</div>
            <div className={classes.mainheading}>{data?.mission.mission}</div>
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => navigate("/signup")}
              >
                Sign Up Now
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className={classes.imageContainer}>
            <img
              src={data.image.file.url}
              alt={data?.name}
              className={classes.image}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div> loading..</div>
  );
};

export default PureHeader;
