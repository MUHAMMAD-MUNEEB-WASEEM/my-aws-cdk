import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import GraphQL from "./GraphqlAPI";
import { Auth } from "aws-amplify";
import awsmobile from "../../aws-exports";
Auth.configure(awsmobile);

describe("GraphQL Component Should be Render", () => {
  it("Should Render Correctly", async () => {
    const { getByTestId, getAllByRole } = await render(
      <GraphQL
        apiType="GraphQL"
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

describe("GraphqlAPI Behaviour Without Values", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, getByText } = await render(
      <GraphQL
        apiType="GraphQL"
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

      fireEvent.change(getByTestId("apiUrl"), {
        target: {
          value: "",
        },
      });

      fireEvent.change(getByTestId("schema"), {
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
    expect(getByText("API Url Required")).toBeInTheDocument();
    expect(getByText("Graphql Schema Required")).toBeInTheDocument();
  });
});

describe("Graphql Behaviour With values", () => {
  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, queryByText } = await render(
      <GraphQL
        apiType="GraphQL"
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
      fireEvent.change(getByTestId("apiUrl"), {
        target: {
          value: "https://abc.com",
        },
      });
      fireEvent.change(getByTestId("schema"), {
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
    expect(queryByText("API Url Required")).not.toBeInTheDocument();
    expect(queryByText("Graphql Schema Required")).not.toBeInTheDocument();
  });
});
