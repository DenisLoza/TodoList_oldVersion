import {v1} from "uuid";

export type filterValuesType = "All" | "Completed" | "Active"
export type todoListType ={
    id: string
    title: string
    filter: filterValuesType
}
// type ActionType = {
//     type: string // Тип для Action обязателен!!!
//     // у ActionType может быть любое дополнительное св-во типа string
//     [key: string]: any
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
// Создаем UNION (обобщенный) тип для Action
export type actionsType =
    removeTodoListActionType
    | addTodoListActionType
    | changeTodoListTitleActionType
    | changeTodoListFilterActionType


export let todoListId1 = v1()
export let todoListId2 = v1()
const initialState: Array<todoListType> = [
    // {id: todoListId1, title: "Whats to learn:", filter: "All"},
    // {id: todoListId2, title: "Whats to buy:", filter: "All"}
]


export const todoListsReducer = (state: Array<todoListType> = initialState, action: actionsType): Array<todoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{id: action.todoListId, title: action.title, filter: "All"}, ...state, ]
        }
        case "CHANGE-TODOLIST-TITLE":
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER":
            const filterTodoList = state.find(tl => tl.id === action.id)
            if (filterTodoList) {
                filterTodoList.filter = action.filter
            }
            return [...state]
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
