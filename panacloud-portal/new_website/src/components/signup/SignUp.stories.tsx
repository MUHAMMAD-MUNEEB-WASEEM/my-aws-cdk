import React from "react";
import PureConfirmSignUp from "./ConfirmSignUp";

export default {
  title: "Authentication/PureConfirmSignUp",
  component: PureConfirmSignUp,
};

export const SignupForm1 = (args) => <PureConfirmSignUp {...args} />;
SignupForm1.args = {
  variant: "outlined",
  backgroundColor: "transparent",
};

export const SignupForm2 = (args) => <PureConfirmSignUp {...args} />;
SignupForm2.args = {
  variant: "standard",
  backgroundColor: "transparent",
};

export const SignupForm3 = (args) => <PureConfirmSignUp {...args} />;
SignupForm3.args = {
  variant: "filled",
  backgroundColor: "#e2fae2",
};
