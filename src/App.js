import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Input } from "semantic-ui-react";

function App() {
  const [todoState, setTodoState] = useState({
    todoText: "",
    todoItems: [],
  });

  function addItem() {
    setTodoState({
      todoText: "",
      todoItems: todoState.todoItems.concat(todoState.todoText),
    });
  }

  const listItems = todoState.todoItems.map((item, i) => (
    <li key={i}>{item}</li>
  ));

  return (
    <div className="App">
      <Input
        action={{
          content: "add",
          onClick: () => addItem(),
        }}
        placeholder="add item..."
        onChange={(event) => {
          console.log(event.target.value);
          setTodoState({
            todoText: event.target.value,
            todoItems: todoState.todoItems,
          });
        }}
        value={todoState.todoText}
      />

      <ul>{listItems}</ul>
    </div>
  );
}

export default App;
