import React, {useState} from 'react';
import './App.css';
import {tasksType, TodoList} from './TodoList';
// Библиотека для генерации уникальных id
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {ClearAll} from "@material-ui/icons";


export type FilterValuesType = "All" | "Completed" | "Active";

type todoListType ={
  id: string
  title: string
  filter: FilterValuesType
};

type TasksStateType = {
  [key: string]: Array<tasksType>
}

function App() {

  // Генерируем id для каждого туду листа
  let todoListId1 = v1();
  let todoListId2 = v1();

  // Состояние всех туду листов. Хук useState
  let [todoList, setTodoList] = useState <Array<todoListType>> ([
    { id: todoListId1, title: "Whats to learn #1", filter: "All" },
    { id: todoListId2, title: "Whats to learn #2", filter: "All" }
  ]);

  // ОТДЕЛЬНЫЙ todo List
  let [tasks, setTasks] = useState <TasksStateType> ({
    [todoListId1]: [
      {id: v1(), title: "HTML & CSS", isDone: true},
      {id: v1(), title: "JS", isDone: false},
      {id: v1(), title: "React", isDone: true},
      {id: v1(), title: "Redux", isDone: true},
      {id: v1(), title: "Node JS", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Bread", isDone: false},
      {id: v1(), title: "Beer", isDone: true},
      {id: v1(), title: "Fish", isDone: true},
      {id: v1(), title: "Chips", isDone: false},
    ]
  });

  // фильтр тасок на удаление по нажатию клавиши Х взаимодействует с хук1
  function removeTask(id: string, todoListId: string) {
    // Через переменную todoList мы узнаем конкретный тудулист, например: todoListId1
    let todoList = tasks[todoListId];
    // Пропускаем через фильтр таску для конкретного тудулиста
    tasks[todoListId] = todoList.filter(t => t.id !== id);
    setTasks({...tasks});
  }

  // Функция для обработки чекбокса таски выполнено или не выполнено
  function changeStatus (id: string, isDone: boolean, todoListId: string) {
    // достаем нужный массив по todoListId
    let todoTasks = tasks[todoListId];
    // ищем нужную таску
    let task = todoTasks.find(t => t.id === id);
    // изменим таску, если она нашлась
    if (task) {
      task.isDone = isDone;
      // копируем массив тасок через деструктуризацию и отдаем в useState для перерисовки
      setTasks({...tasks});
    }
  }

  // Хук2 следит за состоянием списка тасок после нажатия кнопок all-active-completed
  let [filter, setFilter] = useState<FilterValuesType>("All");

  // Функция передает значение по нажатию кнопок "all-active-completed" в ф-цию setFilter для хука2
  // function changeFilter(value: FilterValuesType) {
  //   setFilter(value);
  // }
  function changeFilter(value: FilterValuesType, todoListId: string) {
   let todo = todoList.find(tl => tl.id === todoListId);
   if (todo) {
     todo.filter = value
   };
    setTodoList([...todoList]);
  }

  // Функция добавления новой таски по клику на кнопку +
  function addTask(title: string, todoListId: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let todoList = tasks[todoListId];
    tasks[todoListId] = [newTask, ...todoList];  /*Создаем новый массив добавляя новую таcку в начало и остальные таски из старого массива tasks*/
    setTasks({...tasks}); /*Отдаем новый полученный список тасок в useState для изменения*/
  }

  // Удаление Туду ЛИСТА целиком
  function removeTodoList (todoListId:string) {
    let newTodoList = todoList.filter(tl => tl.id !== todoListId);
    setTodoList(newTodoList);
    // Удаляем все таски в удаленном туду листе
    delete tasks[todoListId];
    setTasks({...tasks})
  }

  // Функция добавления новой таски
  function addTodoList(title: string) {
    const newTodoListId: string = v1()
    const newTodoList: todoListType = {
      id: newTodoListId,
      title: title,
      filter: "All"
    }
    setTodoList([newTodoList, ...todoList])
    setTasks({
      ...tasks,
      [newTodoListId]: []
    })
  }

  function changeTitle(taskId: string, newTitle: string, todoListId: string) {
    let task = tasks[todoListId].find(t => t.id === taskId)
    if (task) {
      task.title = newTitle;
      setTasks({...tasks})
    }
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    const newTodoList = todoList.find (tl => tl.id === id)
    if (newTodoList) {
      newTodoList.title = newTitle
      setTodoList([...todoList])
    }
  }

  // Отрисовка списка тасок

  return (
      <div className="App">
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <ClearAll />
              </IconButton>
              <Typography variant="h6">
                ToDo
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        <Container fixed>
          <Grid container style={{ padding: "10px"}}>
            <AddItemForm addItem={addTodoList}/>
          </Grid>
          <Grid container spacing={3}>
        {todoList.map(tl => {
          // Фильтр тасок по нажатию кнопок completed - active
          let tasksForTodoList = tasks[tl.id];
          if (tl.filter === "Completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
          }
          if (tl.filter === "Active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
          }

        return (
            <Grid item>
              <Paper style={{ padding: "10px" }}>
            <TodoList id={tl.id}
                      key={tl.id}
                      title={tl.title}
                      filter={tl.filter} /*Св-во передает значение класса для активной кнопки all-active-comp*/
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      removeTodoList={removeTodoList}
                      changeTitle={changeTitle}
                      changeTodoListTitle={changeTodoListTitle}
            />
              </Paper>
            </Grid>
            )
        })}
          </Grid>
        </Container>
      </div>
  )
}

export default App;
