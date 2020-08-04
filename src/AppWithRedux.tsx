import React, {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import "./App.css"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {ClearAll} from "@material-ui/icons"
import {TodoList} from "./TodoList"
import {AddItemForm} from "./AddItemForm"
import {appRootStateType} from "./state/store"
import {
  changeTodoListFilterAC,
  filterValuesType, todoListDomainType, fetchTodolistsTC, removeTodolistTC, addTodolistTC, changeTodolistTC
} from "./state/todolistsReducer"
import {
  addTaskTC,
  changeTaskTitleAC,
  removeTaskTC,
  tasksStateType, updateTaskTC
} from "./state/tasksReducer"
import {taskStatusesEnum} from "./api/todolists-api"


function AppWithRedux() {

  // передаем dispatch в редьюсеры с помощью react-redux
  const dispatch = useDispatch()
  // из глобального стейта достаем нужные объекты, т.к. используем общий редьюсер ф-цию (combineReducers)
  const todolists = useSelector<appRootStateType, Array<todoListDomainType>>(state => state.todolists)
  const tasks = useSelector<appRootStateType, tasksStateType>(state => state.tasks)

  // добавление списка туду листов из сервера
  useEffect(() => {
    dispatch(fetchTodolistsTC())
  },[])

  // удаление тасок в BLL и на сервере
  const removeTask = useCallback((id: string, todoListId: string) => {
    const thunk = removeTaskTC(id, todoListId)
    dispatch(thunk)
  }, [dispatch])

  // добавление новой таски в BLL и на сервере
  const addTask = useCallback((title: string, todoListId: string) => {
    const thunk = addTaskTC(title, todoListId)
    dispatch(thunk)
  }, [dispatch])

  // обработка чекбокса таски выполнено или не выполнено в BLL и на сервере
  const changeStatus = useCallback((id: string, status: taskStatusesEnum, todoListId: string) => {
    const thunk = updateTaskTC(id, {status: status}, todoListId)
    dispatch(thunk)
  }, [dispatch])

  // изменение названия таски в BLL и на сервере
  const changeTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
    const thunk = updateTaskTC(taskId, {title: newTitle}, todoListId)
    dispatch(thunk)
  }, [dispatch])

  // Удаление Туду-листа целиком в BLL и на сервере
  const removeTodoList = useCallback((todoListId: string) => {
    const thunk = removeTodolistTC(todoListId)
    dispatch(thunk)
  }, [dispatch])

  // добавление нового Туду-листа в BLL и на сервере
  const addTodoList = useCallback((title: string) => {
    const thunk = addTodolistTC(title)
    dispatch(thunk)
  }, [dispatch])

  // изменение наименования Туду-листа в BLL и на сервере
  const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
    const thunk = changeTodolistTC(id, newTitle)
    dispatch(thunk)
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
