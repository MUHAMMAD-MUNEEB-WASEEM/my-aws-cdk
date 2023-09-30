import React from 'react';
import { Meta } from '@storybook/react';
import PureLayout from './PureLayout';
import navBarMockData from './Navbar/mockData';
import PureNavBar from './Navbar/PureNavBar';
import PureFooter from './Footer/PureFooter';
import footerMockData from './Footer/mockData';

export default {
    component: PureNavBar,
    title: "Components/Layout",
    excludeStories: ['Template']
} as Meta

export const Template = ({ children }) => (
    <PureLayout
        Navbar={() => <PureNavBar staticData={navBarMockData} currentPath={navBarMockData.allContentfulNavbarItems.nodes[0].url} />}
        Footer={() => <PureFooter staticData={footerMockData} />}
    >
        {children}
    </PureLayout>
)


export const Primary = () => <Template><div>layout body</div></Template>
