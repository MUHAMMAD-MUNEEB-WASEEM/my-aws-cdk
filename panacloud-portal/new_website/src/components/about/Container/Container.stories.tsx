import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Container,  Props } from '.';
import data from './MockData';

export default {
    title: "Components/AboutContainer",
    component: Container,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<Props> = (args) => <Container {...args} />;

export const AboutContainer = Template.bind({});
AboutContainer.args = { ...data };