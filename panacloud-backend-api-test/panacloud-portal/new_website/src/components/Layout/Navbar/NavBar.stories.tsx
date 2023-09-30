import React from 'react';
import { Story, Meta } from '@storybook/react';
import PureNavBar, { PureNavBarProps } from './PureNavBar';
import mockData from './mockData';

export default {
    title: "Components/NavBar",
    component: PureNavBar,
    excludeStories: ["Template"]
} as Meta;

const currentPath = mockData.allContentfulNavbarItems.nodes[0].url

export const Template: Story<PureNavBarProps> = (args) => <PureNavBar {...args} staticData={mockData} currentPath={currentPath} />;

export const UnAuthenticated = Template.bind({});
UnAuthenticated.args = {
};

export const Authenticated = Template.bind({});
Authenticated.args = {
    authData: {
        heroImageUrl: "https://media-exp1.licdn.com/dms/image/C5103AQGhUxpE4MrBMA/profile-displayphoto-shrink_400_400/0/1566197788509?e=1622073600&v=beta&t=LUbyeztUeNI67JehbZ921FTMRKzUwV_gxyXuB8UjVys",
        username: "Zia"
    },
};
