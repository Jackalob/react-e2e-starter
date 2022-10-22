import { getByText, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const login = () => {
  const loginButton = screen.getByRole("button", {
    name: /click here to login/i,
  });
  userEvent.click(loginButton);
};

const addTodo = (keys: string = "foo") => {
  const input = screen.getByRole("textbox", { name: /title/i });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  input.focus();
  userEvent.keyboard(keys);
  userEvent.click(submitButton);
};

test("login is working", () => {
  render(<App />);
  login();

  expect(screen.getByText(/add todo/i)).toBeInTheDocument();
});

test("add new todo when submit button is clicked", async () => {
  render(<App />);
  login();

  expect(screen.getByText(/total todos: 0/i)).toBeInTheDocument();
  expect(screen.queryByText(/foo/i)).not.toBeInTheDocument();

  addTodo();

  expect(await screen.findByText(/total todos: 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/foo/i)).toBeInTheDocument();
});

test("increment the selected todo count when clicked the checkbox", async () => {
  render(<App />);
  login();

  addTodo();
  userEvent.click(await screen.findByRole("checkbox", { name: /foo/i }));

  expect(screen.getByText(/selected todos: 1/i)).toBeInTheDocument();
});
