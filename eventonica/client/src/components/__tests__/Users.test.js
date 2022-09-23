import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import UserManagement from "../Users";

describe("Users", () => {
  it("matches the snapshot", () => {
    var tree = renderer.create(<UserManagement />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

test("should render search by name placeholder text", () => {
  render(<UserManagement />);
  expect(screen.getByPlaceholderText(/by name/)).toBeInTheDocument();
});

test("should render login placeholder text", () => {
  render(<UserManagement />);
  expect(screen.getByPlaceholderText(/Login/)).toBeInTheDocument();
});

test("should render Welcome text", () => {
  render(<UserManagement />);
  expect(screen.queryByText(/Welcome/)).toBeNull();
  //   expect(await screen.findByText(/Welcome/)).toBeInTheDocument()
});

test("should render User Table", () => {
  render(<UserManagement />);
  expect(screen.getByRole("table")).toBeInTheDocument();
});
