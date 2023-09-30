import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    apiRegPage: {
      "& > * + *": {
        marginTop: "0",
      },
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textField: {
      marginTop: "10px",
      marginBottom: "10px",
      paddingTop: "5px",
      paddingBottom: "5px",
    },

    apiRegPage_formContainer: {
      maxWidth: "450px",
      width: "100%",
      minWidth: "260px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      paddingRight: "20px !important",
      paddingLeft: "20px !important",
    },
    apiRegPage_iconsContainer: {
      width: "180px",
      height: "80px",
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      marginTop: "30px",
      border: "none",
      boxShadow: "1px 1px 2px 2px #d3d3d3",
      borderRadius: "5px",
    },
    apiRegPage_iconsContainer_iconDiv: {
      width: "35px",
      height: "35%",
      borderRadius: "50%",
      borderColor: "#ececec",
      boxShadow: "0px 0px 4px 1px #d3d3d3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },

    apiRegPage_iconsContainer_Para: {
      paddingLeft: "15px",
      paddingRight: "15px",
      paddingTop: "7px",
      paddingBottom: "7px",
      backgroundColor: "#5f5f5f",
      color: "#ffffff",
      marginTop: "7px",
      marginBottom: "7px",
      fontSize: "12px",
      letterSpacing: "0.3px",
      fontFamily:
        "Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva,Verdana,sans-serif",
    },
    regBtn: {
      width: "200px",
      height: "40px",
      backgroundColor: "#47ca8f",
      color: "#ffffff",
      border: "none",
      marginTop: "30px",
      marginLeft: "auto",
      marginRight: "auto",
      fontSize: "18px",
    },

    radioBtn: {
      marginLeft: "0",
      marginRight: "0",
      marginTop: "20px",
      marginBottom: "10px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    radioSize: {
      [theme.breakpoints.down("xs")]: {
        width: "161px",
      },
    },

    error: {
      fontSize: "0.75rem",
      marginTop: "3px",
      textAlign: "left",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "lighter",
      lineHeight: "1.66",
      letterSpacing: "0.03333em",
      color: "#f44336",
    },
  })
);
