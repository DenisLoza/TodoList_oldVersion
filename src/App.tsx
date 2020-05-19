import React, {useState} from 'react';
import './App.css';
import {tasksType, TodoList} from './TodoList';
// Библиотека для генерации уникальных id
import {v1} from 'uuid';


export type FilterValuesType = "All" | "Completed" | "Active";


function App() {

  // Переменная завернута в Хук1 useState
let [tasks, setTasks] = useState( [
    {id: v1(), title: "HTML & CSS ", isDone: true},
    {id: v1(), title: "JS ", isDone: false},
    {id: v1(), title: "Reakt ", isDone: true},
    {id: v1(), title: "Redux ", isDone: true},
    {id: v1(), title: "Node JS ", isDone: false},
  ]);

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


  // фильтр тасок на удаление по нажатию клавиши Х взаимодействует с хук1
  function removeTask(id: string) {
    let filtredTasks = tasks.filter(t => t.id !== id)
    setTasks(filtredTasks);
  }

  // Функция для обработки чекбокса таски выполнено или не выполнено
  function changeStatus (id: string, isDone: boolean) {
    let task = tasks.find(t => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks([...tasks]); /*Копируем массив тасок через деструктуризацию и отдаем в useState для перерисовки*/
    }
  }

  // Хук2 следит за состоянием списка тасок после нажатия кнопок all-active-completed
  let [filter, setFilter] = useState<FilterValuesType>("All");

  // Функция передает значение по нажатию кнопок "all-active-completed" в ф-цию setFilter для хука2
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  // Функция добавления новой таски по клику на кнопку +
  function addTask(title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let newTasks = [newTask, ...tasks];  /*Создаем новый массив добавляя новую таcку в начало и остальные таски из старого массива tasks*/
    setTasks(newTasks); /*Отдаем новый полученный список тасок в useState для изменения*/
  }

  // Фильтр тасок по нажатию кнопок completed - active
  let tasksForTodolist = tasks;
  if (filter === "Completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }
  if (filter === "Active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }

  // Функция для добавления нового листа дел
  const addBoard = () => {
    console.log("Hello");
  }

  // Отрисовка списка тасок
  return (
      <div className="App">
        <TodoList title="What to learn"
                  filter={filter} /*Св-во передает значение класса для активной кнопки all-active-comp*/
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  addBoard={addBoard}/>
      </div>
  );
}

export default App;
