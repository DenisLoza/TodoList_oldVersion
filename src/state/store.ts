import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasksReducer";

// type appRootStateType = {
//     todolists: Array<todoListType>
//     tasks: tasksStateType
// }
// автоматическая типизация. Возьми тип у rootReduser
export type appRootStateType = ReturnType<typeof rootReduser>

// создаем общий редьюсер
const rootReduser = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})
// создаем стор и передаем туда общий редьюсер
export const store = createStore(rootReduser)


// @ts-ignore
window.store = store
