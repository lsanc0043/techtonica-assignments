import { screen, render } from "@testing-library/react";
import App from "../../App";

describe("App", () => {
  test("should render App", () => {
    render(<App />);
    screen.debug();
  });
});
