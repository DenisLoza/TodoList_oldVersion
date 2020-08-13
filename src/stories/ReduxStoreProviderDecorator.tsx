import React from "react"
import {applyMiddleware, combineReducers, createStore} from "redux"
import {Provider} from "react-redux"
import {v1} from "uuid"
import {todolistsReducer} from "../features/TodolistsList/Todolists/todolistsReducer"
import {tasksReducer} from "../features/TodolistsList/Todolists/tasksReducer"
import {taskPrioritiesEnum, taskStatusesEnum} from "../api/todolists-api"
import {appRootStateType} from "../app/store"
import thunk from "redux-thunk"
import {appReducer} from "../app/appReducer"

// создаем комбинированный редьюсер
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})


// создаем обобщенный начальный стейт в виде объекта
const initialGlobalState: appRootStateType = {
    todolists: [
        {id: "todoListId1", title: "Whats to learn:", filter: "All", entityStatus: "idle", addedDate: "", order: 0},
        {id: "todoListId2", title: "Whats to buy:", filter: "All", entityStatus: "loading", addedDate: "", order: 1}
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
    },
    app: {
        error: null,
        status: "idle"
    }
}
// в качестве стора передаем обобщенный редьюсер и инициализационный стейт
export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}> {storyFn()}
    </Provider>
)
