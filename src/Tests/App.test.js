import React from "react";
import { render } from "@testing-library/react";
import App from "../Components/App";

test("renders the page title", () => {
  const { getByText } = render(<App />);
  const siteTitle = getByText(/otack sverflow/i);
  expect(siteTitle).toBeInTheDocument();
});
