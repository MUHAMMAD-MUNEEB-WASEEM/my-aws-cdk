import React, { FC } from 'react';
import { PageProps } from 'gatsby';
import { Layout } from '../components';
import LoginFrom from "../components/login";

const Login: FC<PageProps> = () => {
    return (
        <Layout>
            <LoginFrom variant='outlined' />
        </Layout>
    )
}

export default Login;
