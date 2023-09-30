import { PageProps } from 'gatsby';
import React, { FC } from 'react'
import { Layout } from '../components';
import AboutBody from '../components/about';

const About: FC<PageProps> = ({ }) => {
    return (
        <Layout>
            <AboutBody />
        </Layout>
    )
}

export default About;
