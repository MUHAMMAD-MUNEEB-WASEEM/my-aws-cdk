import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core';
import React, { FC } from 'react';
import useStyles from './style';
import { Add, Search } from '@material-ui/icons';
import { navigate } from 'gatsby-link';

export const Header: FC<{}> = () => {
    return (
        <Grid container style={{ marginBottom: '20px' }} >
            <Grid item xs={3} container justify="flex-start" alignContent='flex-start' ><SearchBar /></Grid>
            <Grid item xs={8} container justify="center" alignContent='flex-start' ><Title /></Grid>
            <Grid item xs={1} container justify="flex-end" alignContent='flex-start' ><AddNewApiButton /></Grid>
        </Grid>
    )
}

export const Title: FC<{}> = () => {
    return (
        <Typography variant='h4' component='h1' align='center' >
            API Ideas
        </Typography>
    )
}

export const AddNewApiButton: FC<{}> = () => {
    const classes = useStyles();
    return (
        <Tooltip title='Add new API' >
            <IconButton className={classes.iconButton} href='/register-api' ><Add fontSize='large' /></IconButton>
        </Tooltip>
    )
}

export const SearchBar: FC<{}> = () => {
    const classes = useStyles();
    return (
        <div className={classes.searchBar} >
            <input type="text" placeholder='search' />
            <IconButton><Search /></IconButton>
        </div>
    )
}