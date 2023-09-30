import React from "react";
import CreateAccount from "./CreateAccount";

export default {
  title: "Authentication/PureCreateAccount",
  component: CreateAccount,
};

export const AccountStyle1 = (args) => <CreateAccount {...args} />;
AccountStyle1.args = {
  variant: "outlined",
  backgroundColor: "transparent",
  color: "primary",
};

export const AccountStyle2 = (args) => <CreateAccount {...args} />;
AccountStyle2.args = {
  variant: "standard",
  backgroundColor: "transparent",
  color: "secondary",
};

export const AccountStyle3 = (args) => <CreateAccount {...args} />;
AccountStyle3.args = {
  variant: "filled",
  backgroundColor: "#e2fae2",
  color: "primary",
};
