import { PageProps } from 'gatsby';
import React, { FC } from 'react';
import { Layout } from '../components';
import ProfilesBody from '../components/profiles';

const Profiles: FC<PageProps> = ({ }) => {
    return (
        <Layout>
            <ProfilesBody />
        </Layout>
    )
}

export default Profiles;
