import React from 'react';
import { Story, Meta } from '@storybook/react';
import DetailBox from './DetailBox';

export default {
    title: "Components/DetailBox",
    component: DetailBox,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<any> = (args) => <DetailBox {...args}>Click me</DetailBox>;

export const Primary = Template.bind({});
Primary.args = {color: 'green'};