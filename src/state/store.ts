import {applyMiddleware, combineReducers, createStore} from "redux"
import {todolistsReducer} from "./todolistsReducer"
import {tasksReducer} from "./tasksReducer"
import thunk from "redux-thunk"

// type appRootStateType = {
//     todolists: Array<todoListType>
//     tasks: tasksStateType
// }
// автоматическая типизация. Возьми тип у rootReduser
export type appRootStateType = ReturnType<typeof rootReduser>

// создаем общий редьюсер
const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
// создаем стор и передаем туда общий редьюсер и промежуточный слой для работы с thunk ф-циями
// applyMiddleware - это преобразователь thunk ф-ций в объекты
export const store = createStore(rootReduser, applyMiddleware(thunk))


// @ts-ignore
window.store = store
