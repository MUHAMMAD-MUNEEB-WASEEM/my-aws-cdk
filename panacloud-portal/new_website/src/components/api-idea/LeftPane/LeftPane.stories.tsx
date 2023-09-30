import React from 'react';
import { Story, Meta } from '@storybook/react';
import LeftPane, { Props } from '.';

export default {
    title: "Components/LeftPane",
    component: LeftPane,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<Props> = (args) => <LeftPane {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

