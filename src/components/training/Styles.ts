import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Roboto",
  },
  rootNew: {
    flexGrow: 1,
    fontFamily: "Verdana,sans-serif",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 'auto',
    maxWidth: 370,
    height: 600,
    maxHeight: 'auto',
    position:"relative", 
    marginBottom:50,
    boxShadow: '1px 4px #adaaaa',
    [theme.breakpoints.down("sm")]: {
      maxWidth:"90%",
      height:"auto" ,
    },
  },
  cardArea: {
    marginTop: 40,
  },
  image:{          
    maxHeight:'100%',
    width:'100%',
    height:"450px",
    [theme.breakpoints.down("md")]: {
        height: "auto",  
        maxWidth:'100%',
      },
    [theme.breakpoints.down("sm")]: {
      height: "auto",  
      maxWidth:'100%',
    },
  },            
  headTitle:{
    fontWeight: "bold",        
    fontSize: "3rem",                     
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",  
    },  
    [theme.breakpoints.up("md")]: {
      fontSize: "2.2rem",  
    },       
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",  
    }, 
  },      
  subTitle:{       
    marginTop:"10px",
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: {
        fontSize: "2rem",
        marginTop:"20px",
      }, 
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",  
      marginTop:"20px",
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.2rem",  
    }, 
  },      
  headLine:{    
    fontWeight:"bold",
    marginTop:"40px",
    fontSize: "2rem",           
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",  
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "1.2rem",  
    }, 
  },
  btnStyle:{
    position:"absolute", 
    bottom:20, 
    left:"30%",
    [theme.breakpoints.down("sm")]: {
      left:"40%", 
    }, 
    [theme.breakpoints.down("xs")]: {
      left:"30%",  
    }, 
  },
  programDiv: {
    textAlign: "justify", 
    color:"black", 
    marginBottom:20
  },

  cardRoot: {
    maxWidth: 400,
    overflow: "hidden",
    height:850,
    maxHeight:'100%',
    marginBottom: 40,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },    
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    height: 400,
    display: "flex",
  },
  btnholder: {
    justifyContent: "flex-end",
    display: "flex",
  }
}));  
  
  