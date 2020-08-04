import {v1} from "uuid"
import {todolistType, todolistsAPI} from "../../../api/todolists-api"
import {Dispatch} from "redux"


export let todoListId1 = v1()
export let todoListId2 = v1()
const initialState: Array<todoListDomainType> = [
    // {id: todoListId1, title: "Whats to learn:", filter: "All"},
    // {id: todoListId2, title: "Whats to buy:", filter: "All"}
]

export const todolistsReducer = (state: Array<todoListDomainType> = initialState, action: actionsType): Array<todoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST": {
            const newTodoList: todoListDomainType = {...action.todoList, filter: "All"}
            return [newTodoList, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id
                ? {...tl, title: action.title}
                : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
                : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: "All"}
            })
        default:
            return state
    }
}
// ACTIONS
export type removeTodoListActionType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId1: string) => {
    return {type: "REMOVE-TODOLIST", id: todoListId1} as const
}
export type addTodoListActionType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todoList: todolistType) => {
    return {type: "ADD-TODOLIST", todoList: todoList} as const
}
export type changeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todoListId2: string, newTodoListTitle: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todoListId2, title: newTodoListTitle} as const
}
export type changeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (newFilter: filterValuesType, todoListId2: string) => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: todoListId2} as const
}
export type setTodoListsActionType = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todolists: Array<todolistType>) => {
    return {type: "SET-TODOLISTS", todolists: todolists} as const
}

// THUNK CREATOR ф-ции (возвращают Thunk)
// запрос списка туду листов на сервере
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<actionsType>) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}
// удаление туду листа на сервере
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<actionsType>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodoListAC(todolistId))
            })
    }
}
// удаление туду листа на сервере
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<actionsType>) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
            })
    }
}
// переименование туду листа на сервере
export const changeTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch<actionsType>) => {
        todolistsAPI.updateTodolistTitle(id, title)
            .then((res) => {
                dispatch(changeTodoListTitleAC(id, title))
            })
    }
}

// TYPES
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
