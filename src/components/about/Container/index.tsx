import { Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { useEffect } from "react";
import AOS from "aos";
import { useStyles } from "./Styles";

export type Props = {
  title: string;
  description: string;
  imageFirst: boolean;
  image: string;
};

export const Container: FC<Props> = ({
  description,
  title,
  imageFirst,
  image,
}) => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div>
      {imageFirst ? (
        <Grid container spacing={3} className={classes.mainContainer}>
          <Grid
            data-aos="fade-right"
            item
            xs={12}
            md={6}
            className={classes.imageContainer}
          >
            <img src={image} alt={title} className={classes.image} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className={classes.contentContainer}
            data-aos="fade-left"
          >
            <Typography
              variant="h4"
              gutterBottom
              className={classes.contentHeading}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              className={classes.contentBody}
              color="textSecondary"
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} className={classes.mainContainer}>
          <Grid
            data-aos="fade-right"
            item
            xs={12}
            md={6}
            className={classes.contentContainer}
          >
            <Typography
              variant="h4"
              gutterBottom
              className={classes.contentHeading}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              className={classes.contentBody}
              color="textSecondary"
            >
              {description}
            </Typography>
          </Grid>
          <Grid
            data-aos="fade-left"
            item
            xs={12}
            md={6}
            className={classes.imageContainer}
          >
            <img src={image} alt={title} className={classes.image} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};
