import React from 'react';
import { Story, Meta } from '@storybook/react';
import ApiCard, { ApiCardProps } from '.';
import data from './mockData';

export default {
    title: "Components/ApiCard",
    component: ApiCard,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<ApiCardProps> = (args) => <ApiCard {...args} />;

export const Single = Template.bind({});
Single.args = { ...data[0] };


const TemplateList: Story<{ args: ApiCardProps[] }> = ({ args }) => <div>{args.map((arg, idx) => <ApiCard {...arg} key={idx} />)}</div>;
export const Multiple = TemplateList.bind({});
Multiple.args = { args: data };
