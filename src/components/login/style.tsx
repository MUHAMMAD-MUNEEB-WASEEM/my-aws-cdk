import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signIn: {
      width: "100%",
      minHeight: "90vh",
      display: "flex",
      backgroundColor: "#ffffff",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflowX: "hidden",
    },

    loader: {
      width: "100vw",
      minHeight: "90vh",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflowX: "hidden",
    },
    signIn__form: {
      width: "600px",
      padding: "20px",
      backgroundColor: "#eeeeee",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
    },
    authenticationForm__logo: {
      width: "100%",
      height: "200px",
      backgroundColor: "#fcfcfc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
    },

    authenticationForm__logo__img: {
      width: "100px",
    },

    form: {
      backgroundColor: "#fcfcfc",
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      paddingBottom: "40px",
      borderRadius: "5px",
    },
    form__heading: {
      textTransform: "uppercase",
      fontFamily: "Gill Sans,Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      color: "#cacaca",
      marginTop: "20px",
      marginBottom: "20px",
    },

    margin: {
      marginTop: "10px",
      marginBottom: "10px",
    },
    container: {
      width: "100%",
    },
    btn: {
      marginTop: "10px",
      marginBottom: "10px",
      backgroundColor: "#4abf8b",
      "&:hover": {
        backgroundColor: "#47ca8f",
      },
    },
    btn2: {
      marginTop: "10px",
      marginBottom: "10px",
      borderWidth: "1px",
      borderColor: "#4abf8b",
      color: "#4abf8b",
      "&:hover": {
        backgroundColor: "#ffffff",
      },
    },
    icon: {
      color: "#bdbdbd",
    },
    forgotPass: {
      cursor: "pointer",
      marginLeft: "10px",
    },
  })
);
