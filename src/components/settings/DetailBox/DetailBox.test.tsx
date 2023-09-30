import React from "react";
import { render,cleanup } from "@testing-library/react";
import DetailBox from "./DetailBox";


afterEach(cleanup)
test("DetailBox", () => {
  
  const container = render(<DetailBox />);
  // const container = baseElement.children.item(0)?.childNodes.item(0)
  // expect(container?.childNodes.length).toEqual(2)

  expect(container.getByText(/Account/)).toBeInTheDocument();
  expect(container.getByText(/email/i)).toBeInTheDocument();
  expect(container.getByText(/user id/i)).toBeInTheDocument();
  expect(container.getByText(/name/i)).toBeInTheDocument();
  expect(container.getByText(/Close my account/i)).toBeInTheDocument();
  expect(container.getByTestId("userId").innerHTML=== "").toBe(false)
  expect(container.getByTestId("name").innerHTML=== "").toBe(false)
  expect(container.getByTestId("email").innerHTML=== "").toBe(false)
  
});