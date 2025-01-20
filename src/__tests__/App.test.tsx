import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../App";

test("demo", () => {
  expect(true).toBe(true);
});

test("Render the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
