import React from "react";
import { Story, Meta } from "@storybook/react";
import Sidepane from ".";
export default {
  title: "Components/Sidepane",
  component: Sidepane,
} as Meta;

const Template: Story = (args) => <Sidepane />;

export const Primary = Template.bind({});
