import React, {useEffect, useState} from "react"
import {todolistsAPI} from "../api/todolists-api"

export default {
    title: "API"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        //    здесь мы будем делать запрос и ответ закидывать в стейт
        //    который в виде строки будем отображать в <div>
        let promise = todolistsAPI.getTodolists()
        promise.then((response) => {
            // debugger
            setState(response.data)
        })

    }, [])

    //преобразовывает state в строку
    return <div> {JSON.stringify(state)} </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "Denis TodoList"
        let promise = todolistsAPI.createTodolist(title)
        promise.then((response) => {
            // debugger
            setState(response.data)
        })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "4794d807-a47c-435a-8c07-236f790ab4a2"
        let promise = todolistsAPI.deleteTodolist(id)
        promise.then((response) => {
            // debugger
            setState(response.data)
        })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "4794d807-a47c-435a-8c07-236f790ab4a2"
        let title = "Denis NEW TodoList"
        let promise = todolistsAPI.updateTodolistTitle(id, title)
        promise.then((response) => {
            // debugger
            setState(response.data)
        })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const getTasks = () => {
        let promise = todolistsAPI.getTasks(todolistId)
        promise.then((response) => {
            // debugger
            setState(response.data)
        })
    }

    //преобразовывает state в строку
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={getTasks}> GET TASKS</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteBut = () => {
        let promise = todolistsAPI.deleteTask(todolistId, taskId)
        promise.then((response) => {
            // debugger
            setState(response.data)
        })
    }
    //преобразовывает state в строку
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={"taskId"}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <button onClick={deleteBut}> DELETE TASK</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const createBut = () => {
        let promise = todolistsAPI.createTask(todolistId, taskTitle)
        promise.then((response) => {
            // debugger
            setState(response.data)
        })
    }
    //преобразовывает state в строку
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={"taskTitle"}
                   value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}/>
            <button onClick={createBut}> CREATE TASK</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("title_1")
    const [taskDescription, setTaskDescription] = useState<string>("description_1")
    const [taskStatus, setTaskStatus] = useState<number>(0)
    const [taskPriority, setTaskPriority] = useState<number>(0)
    const [taskStartDate, setTaskStartDate] = useState<string>("")
    const [taskDeadLine, setTaskDeadLine] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const updateBut = () => {
        let promise = todolistsAPI.updateTask(todolistId, taskId, {
            deadline: "",
            description: taskDescription,
            priority: taskPriority,
            startDate: "",
            status: taskStatus,
            title: taskTitle
        })
        promise.then((response) => {
            // debugger
            setState(response.data)
        })
    }
    //преобразовывает state в строку
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"taskId"}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <input placeholder={"todolistId"}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={"taskTitle"}
                   value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}/>
            <input placeholder={"taskDescription"}
                   value={taskDescription}
                   onChange={(e) => {
                       setTaskDescription(e.currentTarget.value)
                   }}/>
            <input placeholder={"taskStatus"}
                   value={taskStatus}
                   onChange={(e) => {
                       setTaskStatus(+e.currentTarget.value)
                   }}/>
            <input placeholder={"taskPriority"}
                   value={taskPriority}
                   onChange={(e) => {
                       setTaskPriority(+e.currentTarget.value)
                   }}/>
            <button onClick={updateBut}> UPDATE TASK </button>
        </div>
    </div>
}
