import { Typography } from '@material-ui/core';
import { PageProps } from 'gatsby';
import React, { FC } from 'react';
import { Layout } from '../components';

const PageNotFound: FC<PageProps> = () => {
    return (
        <Layout>
            <Typography> Sorry Page Not Found </Typography>
        </Layout>
    )
}

export default PageNotFound;
