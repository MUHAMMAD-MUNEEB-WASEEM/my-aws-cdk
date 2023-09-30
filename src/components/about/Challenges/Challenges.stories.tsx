import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Challenges, Props } from '.';
import data from './MockData';

export default {
    title: "Components/AboutBulletList",
    component: Challenges,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<Props> = (args) => <Challenges {...args} />;

export const ChallengesList = Template.bind({});
ChallengesList.args = {
    mainPoints: data
};
