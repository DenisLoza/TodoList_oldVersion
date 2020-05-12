import React, { useState } from 'react';
import './App.css';
import {tasksType, TodoList} from './TodoList';

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  
  let tasks1: Array<tasksType> = [
    { id: 1, title: "HTML & CSS ", isDone: true },
    { id: 2, title: "JS ", isDone: false },
    { id: 3, title: "Reakt ", isDone: true },
    { id: 4, title: "Redux ", isDone: true },
  ]

  // let tasks2: Array<tasksType> = [
  //   { id: 1.0, title: "Batman ", isDone: true },
  //   { id: 1.1, title: "StarWars ", isDone: true },
  //   { id: 1.2, title: "Saw ", isDone: false },
  // ]

  // let tasks3: Array<tasksType> = [
  //   { id: 2.0, title: "Katatonia ", isDone: true },
  //   { id: 2.1, title: "Carcass ", isDone: false },
  //   { id: 2.2, title: "Metallica ", isDone: true },
  // ]

  let [tasks, setTasks] = useState(tasks1);
  let [filter, setFilter] = useState<FilterValuesType>("all");
  // let tasks = arr[0];
  // let setTasks = arr[1];

  // фильтр задач на удаление по нажатию клавиши Х
  function removeTask(id: number) {
    let filtredTasks = tasks.filter( t => t.id !== id)
    setTasks(filtredTasks);
  }

  function changeFilter (value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList title="to learn"
       tasks={tasksForTodolist}
       removeTask={removeTask}
       changeFilter={changeFilter}/>
      {/* <TodoList title="moves" tasks={tasks1}/>
      <TodoList title="songs"tasks={tasks2}/> */}
    </div>
  );
}


export default App;
