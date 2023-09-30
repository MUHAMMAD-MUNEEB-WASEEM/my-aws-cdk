import React from "react";
import SignInComponent from "./SignIn";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, act } from "@testing-library/react";
import awsmobile from "../../aws-exports";
import { Auth } from "aws-amplify";

Auth.configure(awsmobile);
describe("CreateAccount Render Component", () => {
  it("Render 2 Input Components", async () => {
    const { getByTestId } = await render(
      <SignInComponent setOpen={false} setError="" setForgotPassword={false} />
    );
    expect(getByTestId("email")).toBeInTheDocument();
    expect(getByTestId("pass")).toBeInTheDocument();
  });

  it("Renders 2 Buttons", async () => {
    const { getByText } = await render(
      <SignInComponent setOpen={false} setError="" setForgotPassword={false} />
    );
    expect(getByText("Create Account")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });
});

describe("Form Behaviour Without Values", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, getByText } = await render(
      <SignInComponent setOpen={false} setError="" setForgotPassword={false} />
    );
    fireEvent.change(getByTestId("email"), {
      target: {
        value: "",
      },
    });

    fireEvent.change(getByTestId("pass"), {
      target: {
        value: "",
      },
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(getByText("Email Required")).toBeInTheDocument();
    expect(getByText("Password Required")).toBeInTheDocument();
  });
});

describe("Form Behaviour With Email", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, queryByText } = render(
      <SignInComponent setOpen={false} setError="" setForgotPassword={false} />
    );

    fireEvent.change(getByTestId("email"), {
      target: {
        value: "johnsmith@gmail.com",
      },
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(queryByText("Email Required")).not.toBeInTheDocument();
  });
});

describe("Form Behaviour With Invalid Email", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, queryByText } = render(
      <SignInComponent setOpen={false} setError="" setForgotPassword={false} />
    );

    fireEvent.change(getByTestId("email"), {
      target: {
        value: "johnsmith",
      },
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(queryByText("Invalid Email")).toBeInTheDocument();
  });
});

describe("Form Behaviour With Password", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, queryByText } = render(
      <SignInComponent setOpen={false} setError="" setForgotPassword={false} />
    );

    fireEvent.change(getByTestId("pass"), {
      target: {
        value: "JohnSmith@12345",
      },
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(queryByText("Password Required")).not.toBeInTheDocument();
  });
});

describe("Form Behaviour With Invalid Password Format", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, queryByText } = render(
      <SignInComponent setOpen={false} setError="" setForgotPassword={false} />
    );

    fireEvent.change(getByTestId("pass"), {
      target: {
        value: "John",
      },
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(
      queryByText("Password must be atleast of 6 characters")
    ).toBeInTheDocument();
  });
});
