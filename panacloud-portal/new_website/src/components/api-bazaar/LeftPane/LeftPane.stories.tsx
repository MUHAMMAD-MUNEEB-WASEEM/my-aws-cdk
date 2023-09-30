import React from 'react';
import { Story, Meta } from '@storybook/react';
import LeftPane, { LeftPaneProps } from '.';
import { apiType as APISaasTypeEnum } from '../../../graphql/API';

export default {
    title: "Components/LeftPane",
    component: LeftPane,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} as Meta;

const apiSaasTypeList = [{ title: "All", count: 21 }, ...Object.values(APISaasTypeEnum).map(val => ({ title: val, count: 19 }))]
const leftPaneItems: LeftPaneProps['items'] = [
    { listTitle: "Public APIs", listItems: apiSaasTypeList, listCount: 21 },
    { listTitle: "Company Private APIs", listItems: apiSaasTypeList, listCount: 21 },
    { listTitle: "My Published APIs", listItems: apiSaasTypeList, listCount: 21 },
    { listTitle: "My Under Development APIs", listItems: apiSaasTypeList, listCount: 21 },
    { listTitle: "My API Subscriptions", listItems: apiSaasTypeList, listCount: 21 },
]

const Template: Story<LeftPaneProps> = (args) => <LeftPane {...args} />;

export const Primary = Template.bind({});
Primary.args = { items: leftPaneItems };

