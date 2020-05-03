import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() { 

  const [todoState, setTodoState] = useState({
    todoText:"",
    todoItems: []
  });

  function addItem() {
    setTodoState({
      todoText: "",
      todoItems: todoState.todoItems.concat(todoState.todoText)
    });
  };

  const listItems = todoState.todoItems.map((item, i) =>
    <li key={i}>{item}</li>
  );

  return (
    <div className="App">
      <input type="text" value={todoState.todoText} onChange={(event)=> {
        console.log(event.target.value); 
        setTodoState({
          todoText:event.target.value,
          todoItems: todoState.todoItems
        })
        }}> 
      </input>
      <button onClick={addItem}>
        Add
      </button>
  <ul>{listItems}</ul>
    </div>
  );
}

export default App;
