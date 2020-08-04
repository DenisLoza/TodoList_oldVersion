import {v1} from "uuid"
import {todolistType, todolistsAPI} from "../api/todolists-api"
import {Dispatch} from "redux"


// export type todoListType = {
//     id: string
//     title: string
//     filter: filterValuesType
// }

export type removeTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type addTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
    todoListId: string
}
export type changeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}
export type changeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: filterValuesType
}
export type setTodoListsActionType = {
    type: "SET-TODOLISTS",
    todolists: Array<todolistType>
}
// Создаем UNION (обобщенный) тип для Action
export type actionsType =
    removeTodoListActionType
    | addTodoListActionType
    | changeTodoListTitleActionType
    | changeTodoListFilterActionType
    | setTodoListsActionType

export type filterValuesType = "All" | "Completed" | "Active"
// в типизацию из API добавляем локальную типизацию TodoList
export type todoListDomainType = todolistType & {
    filter: filterValuesType
}


export let todoListId1 = v1()
export let todoListId2 = v1()
const initialState: Array<todoListDomainType> = [
    // {id: todoListId1, title: "Whats to learn:", filter: "All"},
    // {id: todoListId2, title: "Whats to buy:", filter: "All"}
]


export const todolistsReducer = (state: Array<todoListDomainType> = initialState, action: actionsType): Array<todoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todoListId,
                title: action.title,
                filter: "All",
                addedDate: "",
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const filterTodoList = state.find(tl => tl.id === action.id)
            if (filterTodoList) {
                filterTodoList.filter = action.filter
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl, filter: "All"
                }
            })
        }
        default:
            return state
    }
}
// Ф-ция, которая собирает объект Action и возвращает его в файл test (создаем для удобства)
export const removeTodoListAC = (todoListId1: string): removeTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: todoListId1}
}
export const addTodoListAC = (newTodoListTitle: string): addTodoListActionType => {
    return {type: "ADD-TODOLIST", title: newTodoListTitle, todoListId: v1()}
}
export const changeTodoListTitleAC = (todoListId2: string, newTodoListTitle: string): changeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todoListId2, title: newTodoListTitle}
}
export const changeTodoListFilterAC = (newFilter: filterValuesType, todoListId2: string): changeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: todoListId2}
}
export const setTodoListsAC = (todolists: Array<todolistType>): setTodoListsActionType => {
    return {type: "SET-TODOLISTS", todolists: todolists}
}

// THUNK CREATOR ф-ции (возвращают Thunk)
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}
