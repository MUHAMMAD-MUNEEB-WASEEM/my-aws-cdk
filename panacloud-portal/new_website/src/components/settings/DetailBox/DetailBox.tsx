import React from 'react';
import { Grid, Typography,Box } from '@material-ui/core';
import {useStyles} from './style'
import EditIcon from '@material-ui/icons/Edit';
import data, {DataT} from './mockData'


function DetailBox() {

  const classes = useStyles();
  return(
    <div className={classes.root} id="detailboxContainer">
      <Typography  component="h6" variant="h6" >Contact Info</Typography>
      <Box className={classes.box} >
        <Box className={classes.boxHeader}>
          <Typography style={{display:"inline"}}  variant="h6" >Account</Typography>
          <EditIcon className={classes.pencliIcon} />
        </Box>
        <Box className={classes.boxContent}>
          
          <Typography   variant="body2" >
            <Box fontWeight="fontWeightBold" className={classes.boxContentText}>
              User ID
            </Box>
            <Typography  data-testid="userId" variant="body2" >
              {data[0].userId}
            </Typography>
            <Box fontWeight="fontWeightBold" className={classes.boxContentText}>
              Name
            </Box>
            <Typography  data-testid="name" variant="body2" >
              {data[0].name}
            </Typography>
            <Box fontWeight="fontWeightBold" className={classes.boxContentText}>
              Email
            </Box>
            <Box>
            <Typography data-testid="email"  variant="body2" >
              {data[0].email}
            </Typography>
            </Box>
            <Box className={classes.boxContentTextLeft}>
              Close my account
            </Box>
            <Box style={{clear:"both"}}></Box>
            
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default DetailBox;
