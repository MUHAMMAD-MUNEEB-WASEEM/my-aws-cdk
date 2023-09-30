import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, ListItem, ListItemText,List, Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {useStyles} from './style'


function SideBar(props) {
  const classes = useStyles();
  const dummyData=["Contact Info","Billing Methods","Get Paid", "Accounts","Profile Settings"]
  return(
    <div>
      <List className={classes.root}>
        <Typography component="h6" variant="h6" className={classes.settingHeading} >
          Settings
        </Typography>
       { dummyData.map((item, i)=>(
          <ListItem key={i}>
            
              <ListItemText  primary={item} className={classes.itemText} />
            
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default SideBar;
