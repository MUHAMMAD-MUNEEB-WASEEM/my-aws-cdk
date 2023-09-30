import React, { FC } from 'react';
import { PageProps } from 'gatsby';
import { Layout } from '../components';
import TrainingBody from '../components/training';

const Training: FC<PageProps> = ({ }) => {
    return (
        <Layout>
            <TrainingBody />
        </Layout>
    )
}

export default Training;
