import React, { FC } from 'react';
import { Meta } from '@storybook/react';
import PureLayout from './PureLayout';
import navBarMockData from './Navbar/mockData';
import PureNavBar, { PureNavBarProps } from './Navbar/PureNavBar';
import PureFooter from './Footer/PureFooter';
import footerMockData from './Footer/mockData';

export default {
    component: PureNavBar,
    title: "Components/Layout",
    excludeStories: ['Template']
} as Meta

export const Template: FC<{ authData?: PureNavBarProps['authData'] }> = ({ children, authData }) => (
    <PureLayout
        Navbar={() => <PureNavBar authData={authData} staticData={navBarMockData} currentPath={navBarMockData.allContentfulNavbarItems.nodes[0].url} />}
        Footer={() => <PureFooter staticData={footerMockData} />}
    >
        {children}
    </PureLayout>
)

const authData = {
    heroImageUrl: "https://media-exp1.licdn.com/dms/image/C5103AQGhUxpE4MrBMA/profile-displayphoto-shrink_400_400/0/1566197788509?e=1622073600&v=beta&t=LUbyeztUeNI67JehbZ921FTMRKzUwV_gxyXuB8UjVys",
    username: "Zia"
}

export const LoggedIn = () => <Template authData={authData} ><div>layout body</div></Template>

export const LoggedOut = () => <Template><div>layout body</div></Template>
