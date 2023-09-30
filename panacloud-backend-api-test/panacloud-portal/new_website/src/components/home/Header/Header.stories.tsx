import React from "react";
import PureHeader from "./PureHeader";
import MockData from "./MockData";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "LandingPage/PureHeader",
  component: PureHeader,
} as Meta;

const data = MockData;
const Template : Story<any>= (args) => <PureHeader {...args} />;

export const HeaderPrimary = Template.bind({});
HeaderPrimary.args = {
  style: "HeaderPrimary",
  data: data,
};

export const HeaderSecondary = Template.bind({});
HeaderSecondary.args = {
  style: "HeaderSecondary",
  data: data,
};

export const HeaderWide = Template.bind({});
HeaderWide.args = {
  style: "HeaderWide",
  data: data,
};
