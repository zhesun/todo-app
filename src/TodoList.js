import React from "react";
import { List, Checkbox } from "semantic-ui-react";

function TodoList(props) {
  const listItems = props.todoState.todoItems.map((item, i) => {
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

  return <List style={{ width: "400px", textAlign: "left" }}>{listItems}</List>;
}

export default TodoList;
