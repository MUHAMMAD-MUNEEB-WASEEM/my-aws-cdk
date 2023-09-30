import React, { FC } from 'react'
import { PageProps } from 'gatsby';
import { Layout } from '../components';
import SettingsBody from '../components/settings';

const Settings: FC<PageProps> = ({ }) => {
    return (
        <Layout>
            <SettingsBody />
        </Layout>
    )
}

export default Settings;
