import React, { useState } from "react";
import "./App.css";
import { Input, List, Checkbox } from "semantic-ui-react";

function App() {
  const [todoState, setTodoState] = useState({
    todoText: "",
    todoItems: [],
  });

  function addItem() {
    setTodoState({
      todoText: "",
      todoItems: todoState.todoItems.concat({
        text: todoState.todoText,
        isDone: false,
      }),
    });
  }

  const listItems = todoState.todoItems.map((item, i) => {
    let decoration = {};
    if (item.isDone === true) {
      decoration = { textDecoration: "line-through" };
    }

    return (
      <List.Item>
        <Checkbox
          style={decoration}
          label={item.text}
          onChange={(event, data) => {
            todoState.todoItems[i] = {
              text: todoState.todoItems[i].text,
              isDone: !todoState.todoItems[i].isDone,
            };
            setTodoState({
              todoText: todoState.todoText,
              todoItems: todoState.todoItems,
            });
          }}
        />
      </List.Item>
    );
  });

  return (
    <div className="App">
      <Input
        action={{
          content: "add",
          onClick: () => addItem(),
        }}
        placeholder="add item..."
        onChange={(event) => {
          setTodoState({
            todoText: event.target.value,
            todoItems: todoState.todoItems,
          });
        }}
        value={todoState.todoText}
      />

      <List>{listItems}</List>
    </div>
  );
}

export default App;
