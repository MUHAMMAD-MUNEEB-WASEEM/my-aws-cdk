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
    rating: {
        display: 'flex',
        alignItems: "center",
        color: "#218A9A",
        flexDirection: 'row',
        flex: "1",
        justifyContent: "space-between",
        width: "327px"
    },
    like: {
        display: 'flex',
        color: '#035691'
    },
    dislike:{
        display: 'flex',
        color: 'black',
        textAlign:"right"
    },
    thumbs:{
        paddingLeft:"12px"
    },
    textImage:{
        display:"flex",
        marginRight:"5%",
    },
    clientPost:{
        boxShadow: '2px 2px 5px lightgrey',
        width: "150%",
    },
    jXkOTb: {
        padding: "15px",
        marginRright: "20%",
    }

}));