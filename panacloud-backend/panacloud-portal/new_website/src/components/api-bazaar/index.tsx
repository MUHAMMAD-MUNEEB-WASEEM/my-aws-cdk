import { PageProps } from 'gatsby';
import React, { FC } from 'react';
import Layout from '../Layout';
import useStyles from './style';
import { Router } from '@reach/router';
import Default from './clientSideRoutes/Default';
import ApiDetails from './clientSideRoutes/ApiDetails';
// import { Grid, Typography, Tooltip, IconButton } from '@material-ui/core';

const ApiBazaar: FC<PageProps> = ({ }) => {
    const classes = useStyles();

    return (
        <Layout>
            <Router basepath='/api-bazaar'>
                <Default path="/" />
                <ApiDetails path="/:apiId" />
            </Router>
        </Layout>
    )
}

export default ApiBazaar;
