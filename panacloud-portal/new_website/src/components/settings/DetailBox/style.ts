import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        margin:"0 4rem"
      },
      box:{
        margin:"2rem 0rem",
        border:"3px solid #DFDFDF",
        
        borderRadius:"7px"
      },
      boxHeader:{
        borderBottom:"2px solid #DFDFDF",
        padding:"2rem",
      },
      pencliIcon:{
        float:"right",
        border:"2px solid #DFDFDF",
        borderRadius:"50%",
        width: "2.5rem",
        height: "2.5rem",
        padding: "5px",
      },
      boxContent:{
        padding:"2rem 2rem"
      },
      boxContentText:{
        padding:"1rem 0 ",
        clear:"both"
      },
      boxContentTextLeft:{
        float:"right",
        margin:"3rem 3rem 1rem 3rem",
        color:"green"
      }
  })
)
