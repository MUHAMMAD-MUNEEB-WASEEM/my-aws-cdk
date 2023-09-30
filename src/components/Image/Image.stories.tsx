import React from 'react';
import { Story, Meta } from '@storybook/react';
import Image, { Props } from '.';

export default {
    title: "Components/Image",
    component: Image,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<Props> = (args) => <Image {...args} />;

export const FixedSize = Template.bind({});
FixedSize.args = {
    url: "https://www.helpinhearing.co.uk/wp-content/uploads/2019/01/image-placeholder-500x500.jpg",
    width: '500px',
    height: '500px'
};

export const Fluid = Template.bind({});
Fluid.args = {
    url: "https://static5.depositphotos.com/1003440/493/i/600/depositphotos_4935983-stock-photo-color-balls.jpg",
    width: '80%',
    height: '40%'
}

export const PositionTopLeft = Template.bind({});
PositionTopLeft.args = {
    url: "https://mortoray.files.wordpress.com/2014/01/css_position_simple.png?w=414",
    width: '80%',
    height: '40%',
    position: 'top left'
}