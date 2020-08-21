import {applyMiddleware, combineReducers, createStore} from "redux"
import {todolistsReducer} from "../features/Todo/Todolists/todolistsReducer"
import {tasksReducer} from "../features/Todo/Tasks/tasksReducer"
import thunk from "redux-thunk"
import {appReducer} from "./appReducer"
import {authReducer} from "../features/Login/AuthReducer"

// type appRootStateType = {
//     todolists: Array<todoListType>
//     tasks: tasksStateType
// }
// автоматическая типизация. Возьми тип у rootReduser
export type appRootStateType = ReturnType<typeof rootReducer>

// создаем общий редьюсер
export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
// создаем стор и передаем туда общий редьюсер и промежуточный слой для работы с thunk ф-циями
// applyMiddleware - это преобразователь thunk ф-ций в объекты
export const store = createStore(rootReducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store
