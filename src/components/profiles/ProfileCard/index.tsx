import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import { ExpandMore } from "@material-ui/icons";
import { useStyles }  from './Styles'

export interface Props {
  name: string;
  description: string;
  perHour: number;
  rating: 1 | 2 | 3 | 4 | 5;
  reviews: number;
  img: string;
}

const ProfileCard: FC<Props> = ({
  name,
  description,
  perHour,
  rating,
  reviews,
  img,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.image}>
              <img className={classes.img} alt={name} src={img} />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  color="textPrimary"
                  variant="h5"
                  component="h3"
                  gutterBottom
                >
                  <b>{name}</b>
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  {description}
                </Typography>
                <Typography color="textSecondary">
                  {perHour} / USD Hour
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <Grid  className={classes.rating}>
                    <Grid container alignItems="center">
                      <div data-testid='rating'>
                        <Rating
                          name="half-rating"
                          value={rating}
                          readOnly
                        />
                      </div>
                      <Typography>
                        <ExpandMore fontSize="small" />
                      </Typography>
                      <Typography>{reviews}</Typography>
                    </Grid>
                    <Grid>
                      <Button
                        variant="contained"
                        disableElevation
                        color="primary"
                      >
                        Follow
                      </Button>
                    </Grid>
                  </Grid>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <hr />
    </div>
  );
};
export default ProfileCard;
