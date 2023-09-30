import React from "react";
import CardFeatures from ".";
import data from "./MockData";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "LandingPage/Cards",
  component: CardFeatures,
}as Meta;

const Template: Story<any>  = (args) => <CardFeatures {...args} />;
const icon = data.icon.file.url;
const title = data.title;
const description = data.description;

export const CardsWide = Template.bind({});
CardsWide.args = {
  display: "wider",
  icon: icon,
  title: title,
  description: description,
};

export const CardsDark = Template.bind({});
CardsDark.args = {
  display: "dark",
  icon: icon,
  title: title,
  description: description,
};
