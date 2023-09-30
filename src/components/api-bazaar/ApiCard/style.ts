import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    container: {
        maxWidth: "800px",
        display: "flex",
        padding: "20px",
        boxShadow: '2px 2px 5px lightgrey',
        borderRadius: "15px",
    },
    apiContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    apiRating: {
        display: 'flex',
        alignItems: "center",
        color: "#218A9A",
    },

}));