import {addTodoListActionType, removeTodoListActionType, setTodoListsActionType} from "./todolistsReducer"
import {taskPrioritiesEnum, taskStatusesEnum, taskType, todolistsAPI, updateTaskType} from "../api/todolists-api"
import {Dispatch} from "redux"
import {appRootStateType} from "./store"

export type tasksStateType = {
    [key: string]: Array<taskType>
}
export type removeTaskActionType = {
    type: "REMOVE-TASK",
    taskId: string
    todoListId: string
}
export type addTaskActionType = {
    type: "ADD-TASK",
    task: taskType
}
export type updateTaskActionType = {
    type: "UPDATE-TASK"
    taskId: string
    model: updateDomainTaskModelType
    todoListId: string
}
export type setTasksActionType = {
    type: "SET-TASKS"
    tasks: Array<taskType>
    todolistId: string
}
export type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    newTitle: string
    todoListId: string
}
export type actionsType =
    removeTaskActionType
    | addTaskActionType
    | updateTaskActionType
    | changeTaskTitleActionType
    | addTodoListActionType
    | removeTodoListActionType
    | setTodoListsActionType
    | setTasksActionType


const initialState: tasksStateType = {
    // [todoListId1]: [
    //     {id: v1(), title: "HTML & CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: false},
    //     {id: v1(), title: "React", isDone: true},
    //     {id: v1(), title: "Redux", isDone: true},
    //     {id: v1(), title: "Node JS", isDone: false},
    // ],
    // [todoListId2]: [
    //     {id: v1(), title: "Milk", isDone: true},
    //     {id: v1(), title: "Bread", isDone: false},
    //     {id: v1(), title: "Beer", isDone: true},
    //     {id: v1(), title: "Fish", isDone: true},
    //     {id: v1(), title: "Chips", isDone: false},
    // ]
}


export const tasksReducer = (state: tasksStateType = initialState, action: actionsType): tasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            // создаем копию всех тасок из todoList, которую нам передал action, а именно "todoListId2"
            const tasks = stateCopy[action.todoListId]
            // создаем массив из отфильтрованных тасок, у которых Id НЕ равен "2"
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            // в копию стейта кладем отфильтрованные таски на место "todoListId2"
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            const newTask = action.task
            // создаем копию всех тасок из todoList, которую нам передал action, а именно "todoListId2"
            const tasks = stateCopy[newTask.todoListId]
            // создаем новый массив всех тасок, а в начало ставим новую таску
            const newTasks = [newTask, ...tasks]
            // в копию стейта кладем измененный список тасок на место "todoListId2"
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case "UPDATE-TASK": {
            // создаем копию всех тасок из todoList, которую нам передал action, а именно "todoListId2"
            let tasks = state[action.todoListId]
            // таска, чье id будет совпадать с тем, что пришло из экшена поле isDone будет заменено на новое
            // остальные таски остануться без изменений
            state[action.todoListId] = tasks
                .map(t => t.id === action.taskId
                    ? {...t, ...action.model}
                    : t)
            return ({...state})
        }
        case "CHANGE-TASK-TITLE": {
            // создаем копию всех тасок из todoList, которую нам передал action, а именно "todoListId2"
            const tasks = state[action.todoListId]
            // таска, чье id будет совпадать с тем, что пришло из экшена поле title будет заменено на новое
            // остальные таски остануться без изменений
            state[action.todoListId] = tasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.newTitle}
                    : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            stateCopy[action.todoList.id] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            // удаляем из стэйта тудулист с переданной id
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): removeTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todoListId: todoListId}
}
export const addTaskAC = (task: taskType): addTaskActionType => {
    return {type: "ADD-TASK", task}
}
export const updateTaskAC = (taskId: string, model: updateDomainTaskModelType, todoListId: string): updateTaskActionType => {
    return {type: "UPDATE-TASK", taskId: taskId, model: model, todoListId: todoListId}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId: taskId, newTitle: newTitle, todoListId: todoListId}
}
export const setTasksAC = (tasks: Array<taskType>, todolistId: string): setTasksActionType => {
    return {type: "SET-TASKS", tasks: tasks, todolistId: todolistId}
}

// THUNK CREATOR ф-ции (возвращают Thunk)
// запрашивает список тасок у сервера по id туду листа
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
// удаляет таску с сервера по id таски и id туду листа
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
// добавляет новую таску на сервер по id туду листа
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type updateDomainTaskModelType = {
    title?: string
    description?: string
    status?: taskStatusesEnum
    priority?: taskPrioritiesEnum
    startDate?: string
    deadline?: string
}

// изменяем таску на сервере по id таски и id туду листа
export const updateTaskTC = (taskId: string, domainModel: updateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => appRootStateType ) => {
        const state = getState()
        // из стейта берем ту таску, в которой нам необходимо поменять статус
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        // условие для TypeScript (если task не существует, то покажи ошибку в консоли)
        if (!task) {
            console.warn("task not found in the state")
            return
        }
        // все значения таски заполняем ее прошлыми значениями,
        // а потом, те новые значения, которые к нам пришли перезаписываем
        const apiModel: updateTaskType = {
            status: task.status,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description,
            deadline: task.deadline,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}
