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
    thumbsMaterial:{
        fontSize: "60px",
        alignItems: "center",
        paddingTop: "28px",
        paddingLeft: "0px",
        marginBottom: "-3.5%",
        marginLeft: "-2%",
    },
    span:{
        alignContent:"center",
        alignItems:"center"
    },
    likeButton:{
    color: '#035691',
    border: "0px",
    outline: "0px",
    padding: "8px 8px 16px 16px",
    fontSize: "20px",
    transition: "all 0.15s ease-in-out 0s",
    borderRadius: "5px",
    backgroundColor: "transparent",
    alignItems: "center",
    textAlign: "center",
    cursor:"pointer",
    },
    disLikeButton:{
        color: 'black',
        border: "0px",
        outline: "0px",
        padding: "8px 8px 16px 16px",
        fontSize: "20px",
        transition: "all 0.15s ease-in-out 0s",
        borderRadius: "5px",
        backgroundColor: "transparent",
        alignItems: "center",
        textAlign: "center",
        cursor:"pointer",
        marginLeft:"5%",
    },
    suggestSchema:{
        marginRight:"-70%"
    }
}))