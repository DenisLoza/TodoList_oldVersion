import React from "react"
import {combineReducers, createStore} from "redux"
import {Provider} from "react-redux"
import {v1} from "uuid"
import {todoListDomainType, todolistsReducer} from "../state/todolistsReducer"
import {tasksReducer, tasksStateType} from "../state/tasksReducer"
import {taskPrioritiesEnum, taskStatusesEnum} from "../api/todolists-api"

// создаем комбинированный редьюсер
const rootReduser = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// типизация начального стейта
type AppRootStateType = {
    todolists: Array<todoListDomainType>
    tasks: tasksStateType
}
// создаем обобщенный начальный стейт в виде объекта
const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todoListId1", title: "Whats to learn:", filter: "All", addedDate: "", order: 0},
        {id: "todoListId2", title: "Whats to buy:", filter: "All", addedDate: "", order: 1}
    ],
    tasks: {
        ["todoListId1"] : [
            {
                id: v1(), todoListId: "todoListId1", title: "HTML & CSS",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
            {
                id: v1(), todoListId: "todoListId1", title: "JavaScript",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
        ],
        ["todoListId2"] : [
            {
                id: v1(), todoListId: "todoListId2", title: "Milk",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
            {
                id: v1(), todoListId: "todoListId2", title: "Bread",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
        ],
    }
}
// в качестве стора передаем обобщенный редьюсер и инициализационный стейт
export const storyBookStore = createStore(rootReduser,initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}> {storyFn()}
    </Provider>
)
