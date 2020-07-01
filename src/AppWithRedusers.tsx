import React, {useReducer} from 'react'
import './App.css'
import {TodoList} from './TodoList'
// Библиотека для генерации уникальных id
import {v1} from 'uuid'
import {AddItemForm} from "./AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {ClearAll} from "@material-ui/icons"
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC, filterValuesType,
  removeTodoListAC,
  todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";


function AppWithRedusers() {

  // Генерируем id для каждого туду листа
  let todoListId1 = v1()
  let todoListId2 = v1()

  // Стартовый стейт туду-листов
  let [todoList, dispatchTodoListReduser] = useReducer(todoListsReducer, [
    {id: todoListId1, title: "Whats to learn #1", filter: "All"},
    {id: todoListId2, title: "Whats to learn #2", filter: "All"}
  ])

  // Стартовый стейт тасок
  let [tasks, dispatchTasksReduser] = useReducer(tasksReducer, {
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
  })

  // удаление тасок
  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(id, todoListId)
    dispatchTasksReduser(action)
  }
  // добавление новой таски
  function addTask(title: string, todoListId: string) {
    const action = addTaskAC(title, todoListId)
    dispatchTasksReduser(action)
  }

  // обработка чекбокса таски выполнено или не выполнено
  function changeStatus(id: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusAC(id, isDone, todoListId)
    dispatchTasksReduser(action)
  }
  // изменение названия таски
  function changeTitle(taskId: string, newTitle: string, todoListId: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todoListId)
    dispatchTasksReduser(action)
    // let task = tasks[todoListId].find(t => t.id === taskId)
    // if (task) {
    //   task.title = newTitle
    //   setTasks({...tasks})
    // }
  }

  // Удаление Туду-листа целиком
  function removeTodoList(todoListId: string) {
    const action = removeTodoListAC(todoListId)
    dispatchTodoListReduser(action)
    dispatchTasksReduser(action)
    // let newTodoList = todoList.filter(tl => tl.id !== todoListId)
    // setTodoList(newTodoList)
    // // Удаляем все таски в удаленном туду листе
    // delete tasks[todoListId]
    // setTasks({...tasks})
  }

  // добавление нового Туду-листа
  function addTodoList(title: string) {
    const action = addTodoListAC(title)
    dispatchTodoListReduser(action)
    dispatchTasksReduser(action)
    // const newTodoListId: string = v1()
    // const newTodoList: todoListType = {
    //   id: newTodoListId,
    //   title: title,
    //   filter: "All"
    // }
    // setTodoList([newTodoList, ...todoList])
    // setTasks({
    //   ...tasks,
    //   [newTodoListId]: []
    // })
  }

  // изменение наименования Туду-листа
  function changeTodoListTitle(id: string, newTitle: string) {
    const action = changeTodoListTitleAC(id, newTitle)
    dispatchTodoListReduser(action)
    // const newTodoList = todoList.find(tl => tl.id === id)
    // if (newTodoList) {
    //   newTodoList.title = newTitle
    //   setTodoList([...todoList])
    // }
  }

  // изменение фильтров Туду-листа по категориям: All | Active | Completed
  function changeFilter(value: filterValuesType, todoListId: string) {
    const action = changeTodoListFilterAC(value, todoListId)
    dispatchTodoListReduser(action)
  }

  // Хук2 следит за состоянием списка тасок после нажатия кнопок all-active-completed
  // let [filter, setFilter] = useState<filterValuesType>("All")


  // Отрисовка списка тасок
  return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ClearAll/>
            </IconButton>
            <Typography variant="h6">
              ToDo
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container style={{padding: "10px"}}>
            <AddItemForm addItem={addTodoList}/>
          </Grid>
          <Grid container spacing={3}>
            {todoList.map(tl => {
              // Фильтр тасок по нажатию кнопок completed - active
              let tasksForTodoList = tasks[tl.id]
              if (tl.filter === "Completed") {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
              }
              if (tl.filter === "Active") {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
              }

              return (
                  <Grid item>
                    <Paper style={{padding: "10px"}}>
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

export default AppWithRedusers
