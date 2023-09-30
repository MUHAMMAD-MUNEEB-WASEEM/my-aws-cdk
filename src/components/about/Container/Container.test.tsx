import React from "react";
import { Container } from "./";
import { render } from "@testing-library/react";
import data from './MockData'

describe("Container component", () => {
  let container;
  beforeEach(() => {
    container = render(
      <Container {...data}/>
    );
  });

  test("Renders Container", () => {
    expect(container).toBeTruthy();
  });
  test("Renders Container Title", () => {
    expect(container.getByText("About Us")).toBeVisible();
  });
  test("Renders Container Description", () => {
    expect(
      container.getByText(
        "Panacloud is a platform and ecosystem for the Application Programming Interface (API) Economy. APIs are software interfaces that allow once separate software systems to seamlessly and easily talk to each other. The innovative power of APIs has lead to the realization that Software-as-a-Service (SaaS) applications can be built by combining APIs built by specialized API providers. That, in turn, has created the API Economy, which empowers developers to specialize and monetize their skills and domain knowledge."
      )
    ).toBeVisible();
  });
  test("Renders image", () => {
    expect(container.getByAltText("About Us")).toBeVisible();
  });
});