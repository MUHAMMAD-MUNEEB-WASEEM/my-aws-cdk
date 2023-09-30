import { makeStyles, Theme } from '@material-ui/core/styles';

const colors = {
    green: "#28b274",
    blue: "#96bdfb",
    red: "#ac1523"
}

export interface StyleBtnProps {
    color?: keyof typeof colors
}

export default makeStyles<Theme, StyleBtnProps, 'btn'>(theme => ({
    btn: ({ color = "green" }) => ({
        backgroundColor: colors[color],
        color: 'white',
        fontSize: '17px',
        padding: "8px 16px",
        // opacity: 0,
        borderRadius: '5px',
        transition: '.15s ease-in-out',
        boxShadow: '0 0 5px grey',
        outline: '0', border: "0",
        "&:hover": { boxShadow: "0 0 10px grey", },
        "&:active": { boxShadow: "0 0 0 grey", },
    }),

}));