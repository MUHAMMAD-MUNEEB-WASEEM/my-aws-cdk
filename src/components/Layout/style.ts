import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: "100vh",
    },
    // header: {
    //     flex: '0' as string,
    // },
    main: {
        flex: '1 0 auto',
    },
    body: {
        maxWidth: "1420px",
        margin: '20px auto',
        padding: '0 20px',
    },
    // footer: {
    //     flexBasis: '0',
    // },

}))