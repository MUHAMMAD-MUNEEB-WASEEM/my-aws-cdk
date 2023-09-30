import React from "react";
import { Story, Meta } from "@storybook/react";
import ProfileCard, { Props } from ".";
import data from "./mockData";

export default {
  title: "Components/ProfileCard",
  component: ProfileCard,
} as Meta;

const Template: Story<Props> = (args) => <ProfileCard {...args} />;

export const Single = Template.bind({});
Single.args = { ...data[0] };

const TemplateList: Story<{ args: Props[] }> = ({ args }) => (
  <div>
    {args.map((arg, idx) => (
      <ProfileCard {...arg} key={idx} />
    ))}
  </div>
);
export const Multiple = TemplateList.bind({});
Multiple.args = { args: data };
