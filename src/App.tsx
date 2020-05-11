import React from 'react';
import './App.css';
import {tasksType, TodoList} from './TodoList';


function App() {
  
  let tasks1: Array<tasksType> = [
    { id: 1, title: "HTML & CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "CSS", isDone: true },
  ]

  let tasks2: Array<tasksType> = [
    { id: 1, title: "Batman", isDone: true },
    { id: 2, title: "StarWars", isDone: true },
    { id: 3, title: "Saw", isDone: false },
  ]

  let tasks3: Array<tasksType> = [
    { id: 1, title: "Katatonia", isDone: true },
    { id: 2, title: "Carcass", isDone: false },
    { id: 3, title: "Metallica", isDone: true },
  ]

  return (
    <div className="App">
      <TodoList title="to learn" tasks={tasks1}/>
      <TodoList title="moves" tasks={tasks2}/>
      <TodoList title="songs"tasks={tasks3}/>
    </div>
  );
}


export default App;
