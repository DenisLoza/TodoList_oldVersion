import {v1} from "uuid"
import {todolistType, todolistsAPI} from "../../../api/todolists-api"
import {Dispatch} from "redux"
import {requestStatusType, setAppStatusAC, setAppErrorACType, setAppStatusACType} from "../../../app/appReducer"
import {handleServerNetworkError} from "../../../Utils/errorUtils"


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
            const newTodoList: todoListDomainType = {...action.todoList, filter: "All", entityStatus: "idle"}
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
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id
                ? {...tl, entityStatus: action.status}
                : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: "All", entityStatus: "idle"}
            })
        default:
            return state
    }
}
// ACTIONS
export type removeTodoListActionType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {type: "REMOVE-TODOLIST", id: todoListId} as const
}
export type addTodoListActionType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todoList: todolistType) => {
    return {type: "ADD-TODOLIST", todoList: todoList} as const
}
export type changeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todoListId: string, newTodoListTitle: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todoListId, title: newTodoListTitle} as const
}
export type changeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (newFilter: filterValuesType, todoListId: string) => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: todoListId} as const
}

export type changeTodoListEntityStatusActionType = ReturnType<typeof changeTodoListEntityStatusAC>
export const changeTodoListEntityStatusAC = (status: requestStatusType, todoListId: string) => {
    return {type: "CHANGE-TODOLIST-ENTITY-STATUS", status: status, id: todoListId} as const
}

export type setTodoListsActionType = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todolists: Array<todolistType>) => {
    return {type: "SET-TODOLISTS", todolists: todolists} as const
}

// THUNK CREATOR ф-ции (возвращают Thunk)
// запрос списка туду листов на сервере
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<dispatchType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
                // когда ответ от сервера получен отправь статус "succeeded"
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch(error => {
                handleServerNetworkError(error,dispatch)
            })
    }
}
// удаление туду листа на сервере
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<dispatchType>) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodoListEntityStatusAC("loading", todolistId))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodoListAC(todolistId))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}
// добавление нового туду листа на сервер
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<dispatchType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}
// переименование туду листа на сервере
export const changeTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch<dispatchType>) => {
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
    | changeTodoListEntityStatusActionType

export type filterValuesType = "All" | "Completed" | "Active"
// в типизацию из API добавляем локальную типизацию TodoList
export type todoListDomainType = todolistType & {
    filter: filterValuesType
    entityStatus: requestStatusType
}
type dispatchType =
    setAppErrorACType
    | setAppStatusACType
    | actionsType
