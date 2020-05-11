import React from 'react';
import './App.css';
import {tasksType, TodoList} from './TodoList';


function App() {
  
  let tasks0: Array<tasksType> = [
    { id: 0.0, title: "HTML & CSS ", isDone: true },
    { id: 0.1, title: "JS ", isDone: true },
    { id: 0.2, title: "Reakt ", isDone: true },
    { id: 0.3, title: "Redux ", isDone: true },
  ]

  let tasks1: Array<tasksType> = [
    { id: 1.0, title: "Batman ", isDone: true },
    { id: 1.1, title: "StarWars ", isDone: true },
    { id: 1.2, title: "Saw ", isDone: false },
  ]

  let tasks2: Array<tasksType> = [
    { id: 2.0, title: "Katatonia ", isDone: true },
    { id: 2.1, title: "Carcass ", isDone: false },
    { id: 2.2, title: "Metallica ", isDone: true },
  ]

  return (
    <div className="App">
      <TodoList title="to learn" tasks={tasks0}/>
      <TodoList title="moves" tasks={tasks1}/>
      <TodoList title="songs"tasks={tasks2}/>
    </div>
  );
}


export default App;
