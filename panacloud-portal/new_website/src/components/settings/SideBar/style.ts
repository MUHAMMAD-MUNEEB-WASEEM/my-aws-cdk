import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root:{

      },
      settingHeading:{

      },
      itemText:{
        marginTop:"0px 20px",
        
        
        "& .MuiListItemText-primary":{
          padding:"0px 15px"
          
        },
        "&:hover":{
          
          
        }
      }
  })
)
