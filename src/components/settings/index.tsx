import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import Sidebar from './SideBar/SideBar'
import DetailBox from './DetailBox/DetailBox'
import { Grid } from '@material-ui/core';

const Settings: FC = () => {
    return (
        
            <Grid container style={{
                margin:"3rem 1rem"
            }}>
                <Grid item xs={3}>
                    <Sidebar  />
                </Grid>
                <Grid item xs={9} style={{alignItems:"center"}} id="detailbox">
                    <DetailBox/>  
                </Grid>
            </Grid>

        
    )
}

export default Settings;
