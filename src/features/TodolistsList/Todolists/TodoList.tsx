import React, {useCallback, useEffect} from "react"
import "./TodoList.css"
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm"
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan"
import {Button, IconButton} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import {Task} from "./Task/Task"
import {filterValuesType, todoListDomainType} from "./todolistsReducer"
import {taskStatusesEnum, taskType} from "../../../api/todolists-api"
import {useDispatch} from "react-redux"
import {fetchTasksTC} from "./tasksReducer"


export const TodoList = React.memo((props: todoListType) => {
    let demo = props.demo
    if (typeof demo === "undefined") {
        demo = false
    }
    const dispatch = useDispatch()
    // добавление списка тасок от сервера по id тудулиста
    useEffect(() => {
        // если demo режим true тогда не выполнять dispatch(fetchTasksTC(props.id))
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    // Ф-ция добавления новой таски в тудуЛист
    const addNewTask = useCallback((title: string) => {
        console.log("call addNewTask")
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])
    // Ф-ция изменения названия списка задач
    const changeTodoListTitle = useCallback((newTitle: string) => {
        console.log("call changeTodoListTitle")
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props.changeTodoListTitle, props.todolist.id])


    const onAllClickHandler = useCallback(() => {
        // console.log("call onAllClickHandler")
        props.changeFilter("All", props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        // console.log("call onActiveClickHandler")
        props.changeFilter("Active", props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        // console.log("call onCompletedClickHandler")
        props.changeFilter("Completed", props.todolist.id)
    }, [props.changeFilter, props.todolist.id])

    // Удаление таски целиком
    const deleteTask = () => props.removeTodoList(props.todolist.id)

    let tasks = props.tasks
    // Фильтр тасок по нажатию кнопок "All" - "Completed" - "Active"
    if (props.todolist.filter === "Completed") {
        // console.log("call Completed")
        tasks = props.tasks.filter(t => t.status === taskStatusesEnum.Completed)
        // console.log(tasksForTodoList)
    }
    if (props.todolist.filter === "Active") {
        // console.log("call Active")
        tasks = props.tasks.filter(t => t.status === taskStatusesEnum.New)
    }
    // console.log(tasks)

    return (
        // Вывод названия Списка дел и поле ввода input с кнопкой "+"
        <div>
            <h3><EditableSpan value={props.todolist.title}
                              onChange={changeTodoListTitle}/>
                <IconButton aria-label="delete"
                            onClick={deleteTask}
                            disabled={props.todolist.entityStatus === "loading"}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addNewTask}
                         disabled={props.todolist.entityStatus === "loading"}/>

            <div>
                {tasks.map(t =>
                    <Task key={t.id}
                          task={t}
                          todoListId={props.todolist.id}
                          changeTaskStatus={props.changeTaskStatus}
                          changeTitle={props.changeTitle}
                          removeTask={props.removeTask}
                    />)
                }
            </div>
            <div style={{paddingTop: "20px"}}>
                <Button variant={props.todolist.filter === "All" ? "outlined" : "text"}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.todolist.filter === "Active" ? "outlined" : "text"}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.todolist.filter === "Completed" ? "outlined" : "text"}
                        color={"secondary"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})

type todoListType = {
    todolist: todoListDomainType
    tasks: Array<taskType>
    removeTask: (id: string, todoList: string) => void
    changeFilter: (value: filterValuesType, todoListId: string) => void
    addTask: (NewTaskTitle: string, todoList: string) => void
    changeTaskStatus: (id: string, status: taskStatusesEnum, todoList: string) => void
    removeTodoList: (todoListId: string) => void
    changeTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    demo?: boolean
}
