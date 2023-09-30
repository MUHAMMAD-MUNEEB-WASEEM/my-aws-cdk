import React from "react";
import TrainingHeader from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import data from '../MockData';

export default {
  title: "Training/TrainingHeader",
  component: TrainingHeader,
} as Meta;

const Template: Story<any> = (args) => <TrainingHeader {...args} data={data}/> 

export const TrainingHeaders = Template.bind({});
TrainingHeaders.args = {
  color: "black",
};

