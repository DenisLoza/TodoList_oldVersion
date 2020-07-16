import React from "react"
import {combineReducers, createStore} from "redux"
import {Provider} from "react-redux"
import {v1} from "uuid"
import {todoListsReducer, todoListType} from "../state/todolists-reducer"
import {tasksReducer, tasksStateType} from "../state/tasksReducer"

// создаем комбинированный редьюсер
const rootReduser = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})
// типизация начального стейта
type AppRootStateType = {
    todolists: Array<todoListType>
    tasks: tasksStateType
}
// создаем обобщенный начальный стейт в виде объекта
const initialGlobalState = {
    todolists: [
        {id: "todoListId1", title: "Whats to learn:", filter: "All"},
        {id: "todoListId2", title: "Whats to buy:", filter: "All"}
    ],
    tasks: {
        ["todoListId1"] : [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", sDone: true}
        ],
        ["todoListId2"] : [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Butter", isDone: true}
        ],
    }
}
// в качестве стора передаем обобщенный редьюсер и инициализационный стейт
export const storyBookStore = createStore(rootReduser,initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}> {storyFn()}
    </Provider>
)
