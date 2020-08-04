import axios from "axios"

export type todolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type createTodolistType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: todolistType
    }
}
type deleteTodolistType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type updateTodolistTitleType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
// создали обобщенный тип, где D может меняться (это D мы уточняем в дженерике
// или оставляем по-умолчанию {} )
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum taskStatusesEnum {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum taskPrioritiesEnum {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type taskType = {
    description: string
    title: string
    status: taskStatusesEnum
    priority: taskPrioritiesEnum
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type getTasksType = {
    error: string | null
    totalCount: number
    items: taskType[]
}
export type updateTaskType = {
    title: string
    description: string
    status: taskStatusesEnum
    priority: taskPrioritiesEnum
    startDate: string
    deadline: string
}

// подготавливаем специальный объект instance, который передает св-ва в axios
const instance = axios.create({
    // базовый baseURL, который подставляется в начало всех ссылок автоматически
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    // определяет необходимость аутентификации при выполнении междоменного CORS запроса
    withCredentials: true,
    // передает уникальный ключ для разрешения на изменения на сервере
    headers: {"API-KEY": "db4e48f9-ec7e-4d71-a9d1-0523c2d4dc78"}
})

// созадем объект todolistsAPI с вложенными методами
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get <Array<todolistType>> (`todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post <ResponseType<{item: todolistType}>> (`todo-lists`, {title: title})
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete <ResponseType> (`todo-lists/${id}`)
        return promise
    },
    updateTodolistTitle(id: string, title: string) {
        const promise = instance.put <ResponseType> (`todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get  <getTasksType>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete  <ResponseType> (`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post  <ResponseType<{item: taskType}>> (`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: updateTaskType) {
        return instance.put  <ResponseType> (`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}
