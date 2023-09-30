import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "auto",
    marginRight: 30,
  },
  listItemText: { fontSize: "18px" },
}));
