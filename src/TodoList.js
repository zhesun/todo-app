import React, { useState } from "react";
import { List, Checkbox, Radio } from "semantic-ui-react";

function TodoList(props) {
  const [filterMode, setFilterMode] = useState(0);
  const visibleItems = props.todoState.todoItems.filter(
    (item) =>
      filterMode === 0 ||
      (!item.isDone && filterMode === 1) ||
      (item.isDone && filterMode === 2)
  );
  const listItems = visibleItems.map((item, i) => {
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
          onChange={() => {
            props.updateState(i);
          }}
        />
      </List.Item>
    );
  });

  return (
    <>
      <Radio
        label="All"
        checked={filterMode === 0}
        onChange={() => setFilterMode(0)}
      />

      <Radio
        label="Active"
        checked={filterMode === 1}
        onChange={() => setFilterMode(1)}
      />

      <Radio
        label="Completed"
        checked={filterMode === 2}
        onChange={() => setFilterMode(2)}
      />

      <List style={{ width: "400px", textAlign: "left" }}>{listItems}</List>
    </>
  );
}

export default TodoList;
