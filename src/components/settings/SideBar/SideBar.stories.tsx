import React from 'react';
import { Story, Meta } from '@storybook/react';
import SideBar from './SideBar';

export default {
    title: "Components/SideBar",
    component: SideBar,
    
} as Meta;


const Template: Story<any> = () => <SideBar ></SideBar>;

export const Primary = Template.bind({});
