import {filterValuesType, todoListType} from "../App";
import {v1} from "uuid";

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


export const todoListsReducer = (state: Array<todoListType>, action: actionsType): Array<todoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todoListId, title: action.title, filter: "All"}]
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
            throw new Error("I don't understand this action type!")
    }
}
// Ф-ция, которая собирает объект Action и возвращает его в файл test (создаем для удобства)
export const removeTodoListAC = (todoListId1: string): removeTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: todoListId1}
}
export const addTodoListAC = (newTodoListTitle: string): addTodoListActionType => {
    return {type: "ADD-TODOLIST", title: newTodoListTitle, todoListId: v1()}
}
export const changeTodoListTitleAC = (newTodoListTitle: string, todoListId2: string): changeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: newTodoListTitle, id: todoListId2}
}
export const changeTodoListFilterAC = (newFilter: filterValuesType, todoListId2: string): changeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: todoListId2}
}
