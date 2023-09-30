import { withStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

export default makeStyles(theme => ({
    container: {
        width: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        // marginBottom: '20px',
        borderBottom: '1px solid lightgrey',
        "&>div": {
            "&:nth-child(1)": { flex: '0.20' },
            "&:nth-child(2)": { flex: '0.6' },
            "&:nth-child(3)": { flex: '0.20' },
            "@media (max-width: 940px)": {
                "&:nth-child(1)": { flex: '0.4' },
                "&:nth-child(2)": { flex: '0.2' },
                "&:nth-child(3)": { flex: '0.4' },
            },
        },
        fontSize: "20px",
        "@media (max-width: 1200px)": {
            fontSize: "17px"
        },
        "@media (max-width: 1000px)": {
            fontSize: "15px"
        },
    },
    linksList: {
        display: 'flex',
        maxWidth: '700px',
        margin: '0 auto',
        justifyContent: 'space-between',
        listStyle: 'none',
        padding: '0',
        "& > li": {
            fontSize: 'inherit',
            margin: '0 3px',
            padding: '5px 13px',
            transition: '.2s ease-in-out',
            "&>a": { textDecoration: 'none', color: 'inherit' }
        }
    },
    logo: {
        width: '80px',
        "@media (max-width: 1000px)": {
            width: '65px',
        },
    },
    selectedLink: {
        color: 'blue',
        fontWeight: 'bolder',
        borderBottom: '2px solid blue'
    },
    heroSection: {
        display: 'flex',
        justifyContent: 'flex-end',
        '&>div': {
            display: 'flex',
            alignItems: 'center',
            margin: ' 0 4px',
        }
    },
    heroAvatar: {
        cursor:"pointer",
        "&>p": {
            marginLeft: '5px',
            maxWidth: "80px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: 'hidden',
        },

    },
    hideUnder1150px: {
        "@media (max-width: 1150px)": {
            "&:nth-child(1)": { display: 'none' },
        }
    },
    smallAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    }

}));


export const IconButtonC = withStyles({
    root: {
        padding: "8px",
        backgroundColor: '#DFDFDF'
    }
})(IconButton);