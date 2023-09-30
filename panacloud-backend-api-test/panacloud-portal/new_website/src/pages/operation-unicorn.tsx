import React, { FC } from 'react';
import { PageProps } from 'gatsby';
import { Layout } from '../components';
import OperationUnicornBody from '../components/operation-unicorn';

const OperationUnicorn: FC<PageProps> = ({ }) => {
    return (
        <Layout>
            <OperationUnicornBody />
        </Layout>
    )
}

export default OperationUnicorn;
