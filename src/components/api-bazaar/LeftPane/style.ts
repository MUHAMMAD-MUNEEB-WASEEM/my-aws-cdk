import { makeStyles, Theme, createStyles } from '@material-ui/core';


export default makeStyles((theme: Theme) => createStyles({
    container: {
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        // borderRight: '2px solid lightgrey',
    },
    listItemText: { fontSize: '18px', },
    collapse: {
        backgroundColor: "whitesmoke",
        "& $nested": { padding: '0', paddingLeft: theme.spacing(4), paddingRight: theme.spacing(2) }
    },
    nested: {}, // this should not be removed
    selectedItem: { color: 'blue', fontWeight: "bold" }
}));