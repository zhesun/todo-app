import React from "react";
import "./App.css";
import { Input, Grid, Button } from "semantic-ui-react";
import { writeStorage, useLocalStorage } from "@rehooks/local-storage";
import { initialState, addNewItem, clearContent } from "./state";
import TodoList from "./TodoList";

const localStorageKey = "todos";

function App() {
  const [todoState] = useLocalStorage(localStorageKey, initialState);

  function addItem() {
    if (todoState.todoText !== "") {
      const newState = addNewItem(todoState, todoState.todoText);
      writeStorage(localStorageKey, newState);
    }
  }

  function addItemOnEnter(event) {
    if (event.key === "Enter") {
      addItem();
    }
  }

  function clearAll() {
    const clear = clearContent(todoState);
    writeStorage(localStorageKey, clear);
  }

  function updateState(index) {
    todoState.todoItems[index] = {
      text: todoState.todoItems[index].text,
      isDone: !todoState.todoItems[index].isDone,
    };
    writeStorage(localStorageKey, {
      todoText: todoState.todoText,
      todoItems: todoState.todoItems,
    });
  }

  return (
    <div className="App">
      <Grid centered={true}>
        <Grid.Row>
          <Input
            style={{ width: "300px" }}
            onKeyDown={addItemOnEnter}
            action={{
              content: "add",
              onClick: () => addItem(),
            }}
            placeholder="add item..."
            onChange={(event) => {
              writeStorage(localStorageKey, {
                todoText: event.target.value,
                todoItems: todoState.todoItems,
              });
            }}
            value={todoState.todoText}
          />

          <Button onClick={clearAll} style={{ marginLeft: "10px" }}>
            Clear all
          </Button>
        </Grid.Row>

        <Grid.Row>
          <TodoList todoState={todoState} updateState={updateState} />
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
