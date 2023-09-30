import React from "react";
import TrainingProgram from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import data from '../MockData';

export default {
  title: "Training/TrainingProgram",
  component: TrainingProgram,
} as Meta;

const Template: Story<any> = (args) => <TrainingProgram {...args} data={data}/>;

export const TrainingPrograms = Template.bind({});
TrainingPrograms.args = {  
  layout: "tp1",
};