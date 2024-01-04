import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("node-fetch");

test("renders learn react link", () => {
  render(<App />);
  const mockData = {
    status: "ok",
    data: [],
  };
  const linkElement = screen.getByText(/A/i);
  expect(linkElement).toBeInTheDocument();
});
