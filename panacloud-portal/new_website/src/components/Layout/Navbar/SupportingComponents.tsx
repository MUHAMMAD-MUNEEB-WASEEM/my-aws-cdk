import React, { FC } from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import MenuButton, { MenuButtonProps } from './MenuButton';
import useStyles from './style';
import { AuthDataType } from '.';
import Auth from '@aws-amplify/auth';
import { useAppDispatch } from '../../../redux/store';
import { signedOutUser } from '../../../redux/slices/userSlice';
import { navigate } from 'gatsby-link';

/**
 * 
 * usually use to display a dropdown menu having list of [userAvatar with name for as view profile , settings, logout] options
 */
export const UserDropDownMenu: FC<{ authData: AuthDataType, trigButton: MenuButtonProps['trigButton'] }> = ({ authData, trigButton }) => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const handleLogout = () => {
        Auth.signOut();
        dispatch(signedOutUser()) // cleaning the user state in redux
        navigate('/login')
    }

    return (
        <MenuButton
            menuItems={[
                { id: '1', link: "/profiles", item: <Grid container alignItems='center' className={`${classes.heroAvatar}`} > <Avatar src={authData.heroImageUrl} className={classes.smallAvatar} /><Typography>My Profile</Typography> </Grid> },
                { id: '2', link: '/settings', item: <Grid container alignItems='center' ><Settings style={{ marginRight: '10px' }} /><Typography>Settings</Typography></Grid> },
                { id: '3', item: <Grid container alignItems='center' ><img src="https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-3/24/018_128_arrow_exit_logout-512.png" width='30' style={{ marginRight: '7px' }} /><Typography>Log out</Typography></Grid> },
            ]}
            onItemClick={(itemId) => { (itemId === '3') && handleLogout() }}
            trigButton={trigButton}
            width='150px'
        />
    )
}
