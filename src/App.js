import React from "react";
import "./App.css";
import { Input, List, Checkbox, Grid, Button } from "semantic-ui-react";
import { writeStorage, useLocalStorage } from "@rehooks/local-storage";

const localStorageKey = "todos";

function App() {
  const [todoState] = useLocalStorage(localStorageKey, {
    todoText: "",
    todoItems: [],
  });

  function addItem() {
    if (todoState.todoText !== "") {
      writeStorage(localStorageKey, {
        todoText: "",
        todoItems: todoState.todoItems.concat({
          text: todoState.todoText,
          isDone: false,
        }),
      });
    }
  }

  function addItemOnEnter(event) {
    if (event.key === "Enter") {
      addItem();
    }
  }

  function clearAll() {
    writeStorage(localStorageKey, {
      todoText: todoState.todoText,
      todoItems: [],
    });
  }

  const listItems = todoState.todoItems.map((item, i) => {
    let decoration = {};
    if (item.isDone === true) {
      decoration = { textDecoration: "line-through" };
    }

    return (
      <List.Item key={i}>
        <Checkbox
          style={decoration}
          label={item.text}
          checked={item.isDone}
          onChange={(event, data) => {
            todoState.todoItems[i] = {
              text: todoState.todoItems[i].text,
              isDone: !todoState.todoItems[i].isDone,
            };
            writeStorage(localStorageKey, {
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
          <List style={{ width: "400px", textAlign: "left" }}>{listItems}</List>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
