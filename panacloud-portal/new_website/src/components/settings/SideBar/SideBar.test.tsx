import React from "react";
import { render, cleanup } from "@testing-library/react";
import SideBar from "./SideBar";

afterEach(cleanup)
test("Sidebar", () => {
  const container = render(<SideBar/>);

  expect(container.getByText(/contact info/i)).toBeInTheDocument()
  expect(container.getByText(/Billing Methods/i)).toBeInTheDocument();
  expect(container.getByText(/Profile Settings/i)).toBeInTheDocument();
  expect(container.getByText(/Get Paid/i)).toBeInTheDocument();
  expect(container.getByText(/Accounts/i)).toBeInTheDocument();
  
  
});