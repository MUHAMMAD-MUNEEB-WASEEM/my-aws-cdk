import React from "react";
import PureFooter, { PureFooterProps } from "./PureFooter";
import mockData from "./mockData";
import { Meta, Story } from "@storybook/react";

export default {
    title: "Components/PureFooter",
    component: PureFooter,
} as Meta;
const data = mockData;

const Template: Story<PureFooterProps> = (args) => <PureFooter {...args} staticData={data} />;

export const Primary = Template.bind({});
Primary.args = {}