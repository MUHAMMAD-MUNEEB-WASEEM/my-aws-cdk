import React from "react";
import CreateAccount from "./CreateAccount";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Auth } from "aws-amplify";
import awsmobile from "../../aws-exports";
Auth.configure(awsmobile);

describe("CreateAccount Render Component", () => {
  it("Render 4 Input Fields", async () => {
    const Input = render(
      <CreateAccount
        variant="outlined"
        backgroundColor="transparent"
        color="primary"
      />
    );

    expect(Input.getByTestId("username")).toBeInTheDocument();
    expect(Input.getByTestId("email")).toBeInTheDocument();
    expect(Input.getByTestId("pass")).toBeInTheDocument();
  });

  it("Renders 2 Buttons", async () => {
    const { getByText } = render(
      <CreateAccount
        variant="outlined"
        backgroundColor="transparent"
        color="primary"
      />
    );
    expect(getByText("Create Account")).toBeInTheDocument();
    expect(getByText("Back to Login")).toBeInTheDocument();
  });
});

describe("Form behaviour", () => {
  it("validate user inputs, and provides error messages", async () => {
    const Component = render(
      <CreateAccount
        variant="outlined"
        backgroundColor="transparent"
        color="primary"
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId("username"), {
        target: {
          value: "",
        },
      });

      fireEvent.change(screen.getByTestId("email"), {
        target: {
          value: "",
        },
      });

      fireEvent.change(screen.getByTestId("pass"), {
        target: {
          value: "",
        },
      });
    });

    await act(async () => {
      fireEvent.submit(Component.getByTestId("form"));
    });

    expect(Component.getByText("Username Required")).toBeInTheDocument();
    expect(Component.getByText("Required")).toBeInTheDocument();
    expect(
      Component.getByText("Please Enter your password")
    ).toBeInTheDocument();
  });
});

describe("Form Behaviour ", () => {
  it("should submit when form inputs contain text", async () => {
    const Component = render(
      <CreateAccount
        variant="outlined"
        backgroundColor="transparent"
        color="primary"
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId("username"), {
        target: {
          value: "Smith",
        },
      });

      fireEvent.change(screen.getByTestId("email"), {
        target: {
          value: "johnsmith@gmail.com",
        },
      });

      fireEvent.change(screen.getByTestId("pass"), {
        target: {
          value: "JohnSmith@123",
        },
      });
    });

    await act(async () => {
      fireEvent.submit(Component.getByTestId("form"));
    });

    expect(Component.queryByText("Username Required")).not.toBeInTheDocument();
    expect(Component.queryByText("Required")).not.toBeInTheDocument();
    expect(
      Component.queryByText("Please Enter your password")
    ).not.toBeInTheDocument();
  });
});
