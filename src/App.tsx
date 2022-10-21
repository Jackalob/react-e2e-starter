import React, { useState, useRef } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
  selected: boolean;
};

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const idRef = useRef(1);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoInput === "") return;

    setTimeout(() => {
      setTodos((todos) => [
        ...todos,
        {
          id: idRef.current,
          title: todoInput,
          selected: false,
        },
      ]);
      idRef.current += 1;
    }, 500);
    setTodoInput("");
  };

  const toggleTodo = (id: number) => {
    const filteredTodo = todos.find((todo) => todo.id === id);
    if (filteredTodo) {
      filteredTodo.selected = !filteredTodo.selected;
    }
    const newTodos = todos.map((todo) =>
      todo.id === id ? filteredTodo! : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      {!authenticated && (
        <>
          <h1>Login</h1>
          <button type="button" onClick={() => setAuthenticated(true)}>
            Click here to login
          </button>
        </>
      )}

      {authenticated && (
        <>
          <h1>Add Todo</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              id="title"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
          </form>

          <ul>
            {todos.map((todo) => {
              const { id, title, selected } = todo;
              return (
                <li key={id} data-cy={`todo-${title}`}>
                  <label
                    className={selected ? "todoText" : ""}
                    htmlFor={`todoToggle${id}`}
                  >
                    {title}
                  </label>
                  <input
                    type="checkbox"
                    id={`todoToggle${id}`}
                    onChange={() => toggleTodo(id)}
                  />
                  <button type="button" onClick={() => deleteTodo(id)}>
                    Remove
                  </button>
                  <br />
                </li>
              );
            })}
          </ul>

          <p>Total Todos: {todos.length}</p>
          <p>Selected Todos: {todos.filter((todo) => todo.selected).length}</p>
        </>
      )}
    </>
  );
}
