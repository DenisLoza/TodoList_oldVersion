import {FilterValuesType, todoListType} from "../App";
import {v1} from "uuid";

// type ActionType = {
//     type: string // Тип для Action обязателен!!!
//     // у ActionType может быть любое дополнительное св-во типа string
//     [key: string]: any
// }
export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
}
export type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: FilterValuesType
}
// Создаем UNION (обобщенный) тип для Action
export type ActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType


export const todoListsReducer = (state: Array<todoListType>, action: ActionsType): Array<todoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: v1(), title: action.title, filter: "All"}]
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
export const RemoveTodoListAC = (todoListId1: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: todoListId1}
}
export const AddTodoListAC = (newTodoListTitle: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: newTodoListTitle}
}
export const ChangeTodoListTitleAC = (newTodoListTitle: string, todoListId2: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: newTodoListTitle, id: todoListId2}
}
export const ChangeTodoListFilterAC = (newFilter: FilterValuesType, todoListId2: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: todoListId2}
}
