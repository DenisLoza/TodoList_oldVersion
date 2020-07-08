import React, {useCallback} from 'react'
import './App.css'
import {taskType, TodoList} from './TodoList'

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
  [key: string]: Array<taskType>
}

function AppWithRedux() {

  // передаем dispatch в редьюсеры с помощью react-redux
  const dispatch = useDispatch()
  // из глобального стейта достаем нужные объекты
  const todolists = useSelector<appRootStateType, Array<todoListType>>(state => state.todolists)
  const tasks = useSelector<appRootStateType, tasksStateType>(state => state.tasks)


  // удаление тасок
  const removeTask = useCallback((id: string, todoListId: string) => {
    const action = removeTaskAC(id, todoListId)
    dispatch(action)
  }, [dispatch])
  // добавление новой таски
  const addTask = useCallback((title: string, todoListId: string) => {
    const action = addTaskAC(title, todoListId)
    dispatch(action)
  }, [dispatch])
  // обработка чекбокса таски выполнено или не выполнено
  const changeStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
    const action = changeTaskStatusAC(id, isDone, todoListId)
    dispatch(action)
  }, [dispatch])
  // изменение названия таски
  const changeTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
    const action = changeTaskTitleAC(taskId, newTitle, todoListId)
    dispatch(action)
  }, [dispatch])
  // Удаление Туду-листа целиком
  const removeTodoList = useCallback((todoListId: string) => {
    const action = removeTodoListAC(todoListId)
    dispatch(action)
  }, [dispatch])
  // добавление нового Туду-листа
  const addTodoList = useCallback((title: string) => {
    const action = addTodoListAC(title)
    dispatch(action)
  }, [dispatch])
  // изменение наименования Туду-листа
  const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
    const action = changeTodoListTitleAC(id, newTitle)
    dispatch(action)
  }, [dispatch])
  // изменение фильтров Туду-листа по категориям: All | Active | Completed
  const changeFilter = useCallback((value: filterValuesType, todoListId: string) => {
    const action = changeTodoListFilterAC(value, todoListId)
    dispatch(action)
  }, [dispatch])

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
              let allTasksForTodoList = tasks[tl.id]
              let tasksForTodoList = allTasksForTodoList
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
