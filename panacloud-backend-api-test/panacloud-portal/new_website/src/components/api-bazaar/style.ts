import { makeStyles } from "@material-ui/core";


export default makeStyles(theme => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    apiCardList: {
        flex: '.97',
        overflowY: 'auto',
        '&>div': { margin: '10px auto' },
    },
    iconButton: {
        padding: "8px",
        backgroundColor: '#DFDFDF'
    },
    searchBar: {
        width: "100%",
        borderBottom: '3px solid lightgrey',
        display: 'flex',
        padding: '5px',
        "&>input": {
            width: "100%",
            fontSize: "18px",
            border: '0',
            outLine: '0',
            padding: '5px'
        }
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
    borderBox: {
        border: '6px solid #E0E0E0',
        padding: '6px',
        "&>._orange": { color: 'orange', },
        '&>p': {
            lineHeight: '18px',
            marginBottom: '5px',
        }
    },
}))