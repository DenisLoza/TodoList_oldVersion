import React, {useCallback} from "react"
import "./TodoList.css"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {Button, IconButton} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import {Task} from "./Task"
import {filterValuesType} from "./state/todolists-reducer"
import {taskStatusesEnum, taskType} from "./api/todolists-api"


// Типизируем список тасок (id, название, состояние checked)
// export type taskType = {
//     id: string
//     title: string
//     status: taskStatusesEnum
// }
// Типизируем данные для всего Списка дел
type todoListType = {
    id: string
    key: string
    title: string
    filter: filterValuesType
    tasks: Array<taskType>
    removeTask: (id: string, todoList: string) => void
    changeFilter: (value: filterValuesType, todoListId: string) => void
    addTask: (NewTaskTitle: string, todoList: string) => void
    changeTaskStatus: (id: string, status: taskStatusesEnum, todoList: string) => void
    removeTodoList: (todoListId: string) => void
    changeTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}


export const TodoList = React.memo ((props: todoListType) => {
    // console.log("call TodoList")

    // Ф-ция добавления новой таски в тудуЛист
    const addNewTask = useCallback((title: string) => {
        console.log("call addNewTask")
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    // Ф-ция изменения названия списка задач
    const changeTodoListTitle = useCallback((newTitle: string) => {
        console.log("call changeTodoListTitle")
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])


    const onAllClickHandler = useCallback(() => {
        // console.log("call onAllClickHandler")
        props.changeFilter("All", props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        // console.log("call onActiveClickHandler")
        props.changeFilter("Active", props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        // console.log("call onCompletedClickHandler")
        props.changeFilter("Completed", props.id)
    }, [props.changeFilter, props.id])

    // Удаление таски целиком
    const deleteTask = () => props.removeTodoList(props.id)

    let tasks = props.tasks
    // Фильтр тасок по нажатию кнопок "All" - "Completed" - "Active"
    if (props.filter === "Completed") {
        // console.log("call Completed")
        tasks = props.tasks.filter(t => t.status === taskStatusesEnum.Completed)
        // console.log(tasksForTodoList)
    }
    if (props.filter === "Active") {
        // console.log("call Active")
        tasks = props.tasks.filter(t => t.status === taskStatusesEnum.New)
    }
    // console.log(tasks)

    return (
        // Вывод названия Списка дел и поле ввода input с кнопкой "+"
        <div>
            <h3><EditableSpan value={props.title}
                              onChange={changeTodoListTitle}/>
                <IconButton aria-label="delete"
                            onClick={deleteTask}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addNewTask}/>

            <div>
                {tasks.map(t =>
                    <Task key={t.id}
                          task={t}
                          todoListId={props.id}
                          changeTaskStatus={props.changeTaskStatus}
                          changeTitle={props.changeTitle}
                          removeTask={props.removeTask}
                    />)
                }
            </div>
            <div style={{paddingTop: "20px"}}>
                <Button variant={props.filter === "All" ? "outlined" : "text"}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "Active" ? "outlined" : "text"}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "Completed" ? "outlined" : "text"}
                        color={"secondary"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})
