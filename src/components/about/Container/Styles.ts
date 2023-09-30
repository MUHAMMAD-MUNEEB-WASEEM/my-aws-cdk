import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "30px 20px 20px",
    marginTop: "15px",
    fontFamily: "Roboto",
    overflowX: "hidden"
  },
  imageContainer: {
    textAlign: "center",
    margin: "auto 0",
  },
  image: {
    borderRadius: "5px",
    maxWidth: "100%",
    height: "auto",
  },
  contentContainer: {
    margin: "auto",
  },
  contentHeading: {
    fontWeight: "bold",
    textAlign: "center"
  },
  contentBody: {
    maxWidth: "500px",
    margin: "0 auto"
  },
}));
