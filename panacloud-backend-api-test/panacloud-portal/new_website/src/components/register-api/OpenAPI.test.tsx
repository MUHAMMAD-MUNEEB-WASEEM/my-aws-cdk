import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Form from "./OpenAPI";
import { Auth } from "aws-amplify";
import awsmobile from "../../aws-exports";
Auth.configure(awsmobile);

describe("OPENApi Component Should be Render", () => {
  it("Should Render Correctly", async () => {
    const { getByTestId, getAllByRole } = await render(
      <Form
        apiType="OPEN"
        setError={() => ""}
        setOpen={() => false}
        variant="standard"
      />
    );
    expect(getByTestId("form")).toBeInTheDocument();
    expect(getAllByRole("textbox").length).toEqual(5);
    expect(getByTestId("btn")).toBeInTheDocument();
  });
});

describe("OPENApi Behaviour Without Values", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, getByText } = await render(
      <Form
        apiType="OPEN"
        setError={() => ""}
        setOpen={() => false}
        variant="standard"
      />
    );

    await act(async () => {
      fireEvent.change(getByTestId("apiId"), {
        target: {
          value: "",
        },
      });

      fireEvent.change(getByTestId("title"), {
        target: {
          value: "",
        },
      });

      fireEvent.change(getByTestId("rootUrl"), {
        target: {
          value: "",
        },
      });

      fireEvent.change(getByTestId("openApiDef"), {
        target: {
          value: "",
        },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(getByText("API ID Required")).toBeInTheDocument();
    expect(getByText("Title Required")).toBeInTheDocument();
    expect(getByText("API Root Url Required")).toBeInTheDocument();
    expect(getByText("Open API Def Required")).toBeInTheDocument();
  });
});

describe("OPENApi Behaviour With values", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, queryByText } = await render(
      <Form
        apiType="OPEN"
        setError={() => ""}
        setOpen={() => false}
        variant="standard"
      />
    );

    await act(async () => {
      fireEvent.change(getByTestId("apiId"), {
        target: {
          value: "abcd123",
        },
      });
      fireEvent.change(getByTestId("title"), {
        target: {
          value: "This is Title",
        },
      });
      fireEvent.change(getByTestId("rootUrl"), {
        target: {
          value: "https://abc.com",
        },
      });
      fireEvent.change(getByTestId("openApiDef"), {
        target: {
          value: "abcd",
        },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    expect(queryByText("API ID Required")).not.toBeInTheDocument();
    expect(queryByText("Title Required")).not.toBeInTheDocument();
    expect(queryByText("API Root Url Required")).not.toBeInTheDocument();
    expect(queryByText("OPEN API Def Required")).not.toBeInTheDocument();
  });
});
