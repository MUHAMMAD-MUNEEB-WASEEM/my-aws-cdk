import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
export default theme;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    margin: "0px",
    padding: "0px",
  },
  heading: {
    fontWeight: "bolder",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
}));
