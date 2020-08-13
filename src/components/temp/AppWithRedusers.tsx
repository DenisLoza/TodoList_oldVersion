import React, {useReducer} from "react"
import "../../app/App.css"
import {TodoList} from "../../features/TodolistsList/Todolists/TodoList"
// Библиотека для генерации уникальных id
import {v1} from "uuid"
import {AddItemForm} from "../AddItemForm/AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {ClearAll} from "@material-ui/icons"
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC, filterValuesType,
  removeTodoListAC,
  todolistsReducer
} from "../../features/TodolistsList/Todolists/todolistsReducer"
import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from "../../features/TodolistsList/Todolists/tasksReducer"
import {taskPrioritiesEnum, taskStatusesEnum} from "../../api/todolists-api"


function AppWithRedusers() {

  // Генерируем id для каждого туду листа
  let todoListId1 = v1()
  let todoListId2 = v1()

  // Стартовый стейт туду-листов
  let [todoList, dispatchTodoListReduser] = useReducer(todolistsReducer, [
    {id: todoListId1, title: "Whats to learn:", filter: "All", entityStatus: "idle", addedDate: "", order: 0},
    {id: todoListId2, title: "Whats to buy:", filter: "All", entityStatus: "idle", addedDate: "", order: 1}
  ])

  // Стартовый стейт тасок
  let [tasks, dispatchTasksReduser] = useReducer(tasksReducer, {
    [todoListId1]: [
      {
        id: v1(), todoListId: todoListId1, title: "HTML & CSS",
        status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
        addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
        description: ""
      },
      {
        id: v1(), todoListId: todoListId1, title: "JavaScript",
        status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
        addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
        description: ""
      },
      {
        id: v1(), todoListId: todoListId1, title: "React & Redux",
        status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
        addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
        description: ""
      },
    ],
    [todoListId2]: [
      {
        id: v1(), todoListId: todoListId2, title: "Milk",
        status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
        addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
        description: ""
      },
      {
        id: v1(), todoListId: todoListId2, title: "Bread",
        status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
        addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
        description: ""
      },
      {
        id: v1(), todoListId: todoListId2, title: "Butter",
        status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
        addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
        description: ""
      },
    ]
  })

  // удаление тасок
  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(id, todoListId)
    dispatchTasksReduser(action)
  }
  // добавление новой таски
  function addTask(title: string, todoListId: string) {
    const action = addTaskAC({
      todoListId: todoListId,
      title: title,
      status: taskStatusesEnum.New,
      addedDate: "",
      deadline: "",
      description: "",
      order: 0,
      priority: 0,
      startDate: "",
      id: "id exist"
    })
    dispatchTasksReduser(action)
  }

  // обработка чекбокса таски выполнено или не выполнено
  function changeStatus(id: string, status: taskStatusesEnum, todoListId: string) {
    const action = updateTaskAC(id, {status: status}, todoListId)
    dispatchTasksReduser(action)
  }
  // изменение названия таски
  function changeTitle(taskId: string, newTitle: string, todoListId: string) {
    const action = updateTaskAC(taskId, {title: newTitle}, todoListId)
    dispatchTasksReduser(action)
  }

  // Удаление Туду-листа целиком
  function removeTodoList(todoListId: string) {
    const action = removeTodoListAC(todoListId)
    dispatchTodoListReduser(action)
    dispatchTasksReduser(action)
  }

  // добавление нового Туду-листа
  function addTodoList(title: string) {
    const action = addTodoListAC({
      id: v1(),
      addedDate: "",
      order: 0,
      title: title
    })
    dispatchTodoListReduser(action)
    dispatchTasksReduser(action)
  }

  // изменение наименования Туду-листа
  function changeTodoListTitle(id: string, newTitle: string) {
    const action = changeTodoListTitleAC(id, newTitle)
    dispatchTodoListReduser(action)
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
                tasksForTodoList = tasksForTodoList.filter(t => t.status === taskStatusesEnum.Completed)
              }
              if (tl.filter === "Active") {
                tasksForTodoList = tasksForTodoList.filter(t => t.status === taskStatusesEnum.New)
              }

              return (
                  <Grid item>
                    <Paper style={{padding: "10px"}}>
                      <TodoList key={tl.id}
                                todolist={tl}
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
