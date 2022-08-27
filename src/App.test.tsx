/**
 * @file Test rendering of the App component.
 */
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/A small tool/i);
  expect(linkElement).toBeInTheDocument();
});
