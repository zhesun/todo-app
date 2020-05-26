const initialState = {
  todoText: "",
  todoItems: [],
};

function addNewItem(todoState, todoText) {
  return {
    todoText: "",
    todoItems: todoState.todoItems.concat({
      text: todoText,
      isDone: false,
    }),
  };
}

function clearContent(todoState) {
  return {
    todoText: todoState.todoText,
    todoItems: [],
  };
}

export { initialState, addNewItem, clearContent };
