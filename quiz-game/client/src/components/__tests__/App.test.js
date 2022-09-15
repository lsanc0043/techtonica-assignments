import { render, screen } from "@testing-library/react";
import App from "../../App";
import Form from "../inputform";
import Questions from "../questions";

describe("App", () => {
  test("render the App component", () => {
    render(<App />);
  });
});

describe("Form", () => {
  test("render the Form component", () => {
    render(<Form />);
  });
});

describe("Questions", () => {
  test("render the Questions component", () => {
    render(<Questions values={{ numQ: 50 }} />);
  });
});
