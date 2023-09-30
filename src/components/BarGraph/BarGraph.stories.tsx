import React from 'react';
import { Story, Meta } from '@storybook/react';
import BarGraph, { Props } from './';

export default {
    title: "Components/BarGraph",
    component: BarGraph,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<Props> = (args) => <BarGraph {...args} />;

export const Primary = Template.bind({});
Primary.args = {};