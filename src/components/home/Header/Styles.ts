import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  top: {
    marginLeft: 30,
    marginTop: 10,
  },
  subheading: {
    marginBottom: 0,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 22,
    },
  },
  mainheading: {
    fontWeight: "bold",
    fontSize: "5vw",
    [theme.breakpoints.down("sm")]: {
      marginTop: 5,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 10,
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 10,
    },
  },
  btnContainer: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 10,
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 10,
    },
  },
  btn: {
    maxWidth: "none",
    fontSize: "1.5vw",
  },
  imageContainer: {
    marginLeft: 50,
    marginTop: 10,
  },
  image: {
    width: "550px",
    maxWidth: "100%",
    marginRight: "10%",
    marginLeft: "10%",
    float: "right",
  },
}));
