import { PageProps } from 'gatsby';
import React, { FC } from 'react';
import { Layout } from '../components';
import SignUpForm from "../components/signup/index";

const Signup: FC<PageProps> = () => {
    return (
        <Layout>
            <SignUpForm />
        </Layout>
    )
}

export default Signup;
