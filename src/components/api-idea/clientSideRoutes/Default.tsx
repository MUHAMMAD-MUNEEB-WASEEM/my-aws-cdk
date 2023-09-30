import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core';
import ApiCard from '../ApiCard';
import mockData from '../ApiCard/mockData';
import LeftPane from '../LeftPane';
import useStyles from '../style';
import { Header } from '../pageComponents';
import { navigate } from 'gatsby-link';

const Default: FC<RouteComponentProps> = ({ }) => {
    const classes = useStyles();
    return (
        <div className={classes.container} >
            <Header />
            <Grid justify='space-between' container >
                <LeftPane />
                <div className={classes.apiCardList} >
                    {mockData.map((apidata, idx) => {
                        return <ApiCard {...apidata} key={idx} onClick={() => { navigate('/api-idea/stripe') }}/>
                    })}
                </div>
            </Grid>
        </div>
    )
}

export default Default;
