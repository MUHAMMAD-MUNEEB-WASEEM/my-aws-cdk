import React from "react";
import ConfirmSignUp from "./ConfirmSignUp";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Auth } from "aws-amplify";
import awsmobile from "../../aws-exports";
Auth.configure(awsmobile);

describe("CreateAccount Render Component", () => {
  it("Render 2 Input Components", async () => {
    await act(async () => {
      const { getAllByRole } = await render(
        <ConfirmSignUp
          variant="outlined"
          backgroundColor="transparent"
          username="johnsmith@gmail.com"
        />
      );
      expect(getAllByRole("textbox").length).toEqual(2);
    });
  });

  it("Render a Button", async () => {
    await act(async () => {
      const { getByText } = await render(
        <ConfirmSignUp
          variant="outlined"
          backgroundColor="transparent"
          username="johnsmith@gmail.com"
        />
      );
      expect(getByText("Submit")).toBeInTheDocument();
    });
  });
});

describe("Form behaviour", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, getByText } = render(
      <ConfirmSignUp
        variant="outlined"
        backgroundColor="transparent"
        username="johnsmith@gmail.com"
      />
    );

    await act(async () => {
      await fireEvent.change(screen.getByTestId("authCode"), {
        target: {
          value: "",
        },
      });
    });

    await act(async () => {
      await fireEvent.submit(getByTestId("form"));
    });

    expect(getByText("Required")).toBeInTheDocument();
  });
});

describe("Form Behaviour With Input", () => {
  it("should submit when form inputs contain text", async () => {
    const { getByTestId, queryByText } = render(
      <ConfirmSignUp
        variant="outlined"
        backgroundColor="transparent"
        username="johnsmith@gmail.com"
      />
    );

    await act(async () => {
      await fireEvent.change(screen.getByTestId("authCode"), {
        target: {
          value: "12345",
        },
      });
    });

    await act(async () => {
      await fireEvent.submit(getByTestId("form"));
    });

    expect(queryByText("Required")).not.toBeInTheDocument();
  });
});
