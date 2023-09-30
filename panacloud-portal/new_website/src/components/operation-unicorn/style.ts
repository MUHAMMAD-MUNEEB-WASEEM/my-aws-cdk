import { makeStyles } from "@material-ui/core";


export default makeStyles(theme => ({
    container: {
        alignItems: 'center',
    },
    title:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '30px',
    },

    intro:{
        width: '100%',
        height: 'fit-content',
    },

    body:{
        display: 'flex',
        justifyContent:'space-between'
    },

    bodyimage:{
        width:'40%'
    },
    
    bodytext:{
    
    }
    
}))