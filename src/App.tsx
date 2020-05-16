import React, {useState} from 'react';
import './App.css';
import {tasksType, TodoList} from './TodoList';
// Библиотека для генерации уникальных id
import {v1} from 'uuid';


export type FilterValuesType = "all" | "completed" | "active";


function App() {

  let tasks1: Array<tasksType> = [
    {id: v1(), title: "HTML & CSS ", isDone: true},
    {id: v1(), title: "JS ", isDone: false},
    {id: v1(), title: "Reakt ", isDone: true},
    {id: v1(), title: "Redux ", isDone: true},
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

  // Хук1 следит за состоянием tasks1
  let [tasks, setTasks] = useState(tasks1);
  // Хук2 следит за состоянием списка после нажатия кнопок all-active-completed
  let [filter, setFilter] = useState<FilterValuesType>("all");

  // фильтр задач на удаление по нажатию клавиши Х
  function removeTask(id: string) {
    let filtredTasks = tasks.filter(t => t.id !== id)
    setTasks(filtredTasks);
  }

  // Функция передает значение по нажатию кнопок "all-active-completed" в ф-цию setFilter для хука2
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  // Функция добавления новой задачи по клику на кнопку +
  function addTask(title: string) {
    let task = {id: v1(), title: title, isDone: false};
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  // Фильтр задач по нажатию кнопок completed - active
  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }

  // Отрисовка списка задач
  return (
      <div className="App">
        <TodoList title="to learn"
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}/>
        {/* <TodoList title="moves" tasks={tasks1}/>
      <TodoList title="songs"tasks={tasks2}/> */}
      </div>
  );
}

export default App;
