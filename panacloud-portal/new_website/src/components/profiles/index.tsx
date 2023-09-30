import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Sidepane from "./Sidepane";
import ProfileCard from "./ProfileCard";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Roboto",
  },
  HeadingDiv: {
    textAlign: "center",
    marginBottom: 60,
    marginTop: 30,
  },
  pagination: {
    marginBottom: 30,
    marginTop: 60,
  },
  input: {
    width: "100%",
    marginBottom: 50,
  },
}));

const Profiles = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div className={classes.root}>
      <div className={classes.HeadingDiv}>
        <Typography variant="h4" component="h1">
          Serverless SaaS Cloud Developers
        </Typography>
      </div>
      <Grid container direction="row" justify="center">
        <Grid item xs={12} md={3} data-testid="sidepane">
          <Sidepane />
        </Grid>
        <Grid item xs={12} md={7} data-testid="profiles">
          <TextField
            className={classes.input}
            label="Search here"
            data-testid="input"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ProfileCard
            name="Something"
            description="Head of Software Development at Panacloud Pvt Ltd"
            perHour={75}
            rating={1}
            reviews={200}
            img="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small_2x/boy-face-avatar-cartoon-free-vector.jpg"
          />
          <ProfileCard
            name="Something"
            description="Head of Software Development at Panacloud Pvt Ltd"
            perHour={75}
            rating={4}
            reviews={200}
            img="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small_2x/boy-face-avatar-cartoon-free-vector.jpg"
          />
          <ProfileCard
            name="Something"
            description="Head of Software Development at Panacloud Pvt Ltd"
            perHour={75}
            rating={4}
            reviews={200}
            img="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small_2x/boy-face-avatar-cartoon-free-vector.jpg"
          />
          <ProfileCard
            name="Something"
            description="Head of Software Development at Panacloud Pvt Ltd"
            perHour={75}
            rating={4}
            reviews={200}
            img="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small_2x/boy-face-avatar-cartoon-free-vector.jpg"
          />
          <ProfileCard
            name="Something"
            description="Head of Software Development at Panacloud Pvt Ltd"
            perHour={75}
            rating={4}
            reviews={200}
            img="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small_2x/boy-face-avatar-cartoon-free-vector.jpg"
          />
          <Grid
            container
            direction="row"
            justify="center"
            className={classes.pagination}
            data-testid="pagination"
          >
            <Pagination count={10} page={page} onChange={handleChange} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profiles;
