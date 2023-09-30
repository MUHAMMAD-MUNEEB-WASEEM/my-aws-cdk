import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { Props } from './';

export default {
    title: "Components/Button",
    component: Button,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<Props> = (args) => <Button {...args}>Click me</Button>;

export const Primary = Template.bind({});
Primary.args = {color: 'green'};