import React from "react";
import TrainingBody from ".";
import data from './MockData';
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Training/TrainingPage",
  component: TrainingBody,
  argTypes: {
    color: {
      control: {
        type: 'radio',
        options: ['grey', 'black']
      }
    },
    layout: {
      control: {
        type: 'radio',
        options: ['tp1', 'tp2', 'tp3']
      }
    }
  }
} as Meta;

const Template: Story<any> = (args) => <TrainingBody {...args} data={data}/>;

export const TrainingPage = Template.bind({});
TrainingPage.args = {  
  color: "black",
  layout: "tp3",
};