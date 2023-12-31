import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      marginBottom: 30,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: "100%",
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    rating: {
      display: "flex",
      alignItems: "center",
      color: "#218A9A",
    },
  })
);
