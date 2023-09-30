import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      marginTop: 20,
      fontFamily: "Roboto",
    },
    avatar: {
      backgroundColor: "unset",
    },
    cardContent: {
      paddingTop: 0,
    },
    header: {
      paddingBottom: 0,
    },
  })
);
