import React, {useCallback, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {appRootStateType} from "../../app/store"
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTC,
    fetchTodolistsTC,
    filterValuesType,
    removeTodolistTC,
    todoListDomainType
} from "./Todolists/todolistsReducer"
import {addTaskTC, removeTaskTC, tasksStateType, updateTaskTC} from "./Tasks/tasksReducer"
import {taskStatusesEnum} from "../../api/todolists-api"
import {Container, Grid, Paper} from "@material-ui/core"
import {AddItemForm} from "../../components/AddItemForm/AddItemForm"
import {TodoList} from "./Todolists/TodoList"
import { Redirect } from "react-router-dom"

export const TodolistList: React.FC<propsType> = ({demo = false}) => {

    // передаем dispatch в редьюсеры с помощью react-redux
    const dispatch = useDispatch()
    // из глобального стейта достаем нужные объекты, т.к. используем общий редьюсер ф-цию (combineReducers)
    const todolists = useSelector<appRootStateType, Array<todoListDomainType>>(state => state.todolists)
    const tasks = useSelector<appRootStateType, tasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<appRootStateType, boolean>(state => state.auth.isLoggedIn)

    // добавление списка туду листов из сервера
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

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


    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
    }

    return (
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
                                <TodoList todolist={tl}
                                          key={tl.id}
                                          tasks={tasksForTodoList}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeStatus}
                                          removeTodoList={removeTodoList}
                                          changeTitle={changeTitle}
                                          changeTodoListTitle={changeTodoListTitle}
                                          demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

type propsType = {
    demo?: boolean
}
