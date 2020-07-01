import React from 'react'
import './App.css'
import {tasksType, TodoList} from './TodoList'

import {AddItemForm} from "./AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {ClearAll} from "@material-ui/icons"
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC, filterValuesType,
  removeTodoListAC,
  todoListType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {appRootStateType} from "./state/store";

export type tasksStateType = {
  [key: string]: Array<tasksType>
}

function AppWithRedux() {

  // передаем dispatch в редьюсеры с помощью react-redux
  const dispatch = useDispatch()
  // из глобального стейта достаем нужные объекты
  const todolists = useSelector<appRootStateType, Array<todoListType>>(state => state.todolists)
  const tasks = useSelector<appRootStateType, tasksStateType>(state => state.tasks)


  // удаление тасок
  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(id, todoListId)
    dispatch(action)
  }
  // добавление новой таски
  function addTask(title: string, todoListId: string) {
    const action = addTaskAC(title, todoListId)
    dispatch(action)
  }
  // обработка чекбокса таски выполнено или не выполнено
  function changeStatus(id: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusAC(id, isDone, todoListId)
    dispatch(action)
  }
  // изменение названия таски
  function changeTitle(taskId: string, newTitle: string, todoListId: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todoListId)
    dispatch(action)
  }
  // Удаление Туду-листа целиком
  function removeTodoList(todoListId: string) {
    const action = removeTodoListAC(todoListId)
    dispatch(action)
  }
  // добавление нового Туду-листа
  function addTodoList(title: string) {
    const action = addTodoListAC(title)
    dispatch(action)
  }
  // изменение наименования Туду-листа
  function changeTodoListTitle(id: string, newTitle: string) {
    const action = changeTodoListTitleAC(id, newTitle)
    dispatch(action)
  }
  // изменение фильтров Туду-листа по категориям: All | Active | Completed
  function changeFilter(value: filterValuesType, todoListId: string) {
    const action = changeTodoListFilterAC(value, todoListId)
    dispatch(action)
  }

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
            {todolists.map(tl => {
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

export default AppWithRedux
