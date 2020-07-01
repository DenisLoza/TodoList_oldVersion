import {addTodoListActionType, removeTodoListActionType, todoListId1, todoListId2} from "./todolists-reducer";
import {tasksType} from "../TodoList";
import {v1} from "uuid";

export type tasksStateType = {
    [key: string]: Array<tasksType>
}
export type removeTaskActionType = {
    type: "REMOVE-TASK",
    taskId: string
    todoListId: string
}
export type addTaskActionType = {
    type: "ADD-TASK",
    newTaskName: string
    todoListId: string
}
export type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    newIsDone: boolean
    todoListId: string
}
export type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    newTitle: string
    todoListId: string
}
export type actionsType = removeTaskActionType | addTaskActionType
    | changeTaskStatusActionType | changeTaskTitleActionType
    | addTodoListActionType | removeTodoListActionType


const initialState: tasksStateType = {
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
            // создаем копию всех тасок из todoList, которую нам передал action, а именно "todoListId2"
            const tasks = stateCopy[action.todoListId]
            // создаем новую таску с именем "newName"
            const newTask = {id: v1(),  title: action.newTaskName, isDone: false}
            // создаем новый массив всех тасок, а в начало ставим новую таску
            const newTasks = [newTask, ...tasks]
            // в копию стейта кладем измененный список тасок на место "todoListId2"
            stateCopy[action.todoListId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            // создаем копию всех тасок из todoList, которую нам передал action, а именно "todoListId2"
            let tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.newIsDone} : t)
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            // создаем копию всех тасок из todoList, которую нам передал action, а именно "todoListId2"
            const tasks = stateCopy[action.todoListId]
            // вернет таску с id="2"
            let task = tasks.find(t => t.id === action.taskId)
            // у таски с id="2" меняем св-во title на "newTitle"
            // заворачиваем в if из-за того что в реальной программе метод find может не вернуть значение,
            // если не найдет таковое (формально обходим защиту TS от undefined)
            if (task) {
                task.title = action.newTitle
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            // создаем поверхностную копию стейта
            const stateCopy = {...state}
            // удаляем из стэйта тудулист с переданной id
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): removeTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todoListId: todoListId}
}
export const addTaskAC = (newTaskName: string, todoListId: string): addTaskActionType => {
    return {type: "ADD-TASK", newTaskName: newTaskName, todoListId: todoListId}
}
export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todoListId: string): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId: taskId, newIsDone: newIsDone, todoListId: todoListId }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId: taskId, newTitle: newTitle, todoListId: todoListId }
}
