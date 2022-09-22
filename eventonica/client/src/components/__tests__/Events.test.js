import { screen, render } from "@testing-library/react";
import EventManagement from "../Events";

describe("Events", () => {
  test("should render Events component", () => {
    render(<EventManagement />);
    screen.debug();
  });
});
