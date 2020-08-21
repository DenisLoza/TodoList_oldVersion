import {Dispatch} from "redux"
import {authAPI} from "../api/todolists-api"
import {setIsLoggedInAC, setIsLoggedInActionType} from "../features/Login/AuthReducer"

const initialState: initialStateAppReducerType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export const appReducer = (state = initialState, action: actionsStatusAppErrorTypes): initialStateAppReducerType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED-STATUS":
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}
//ACTION CREATORS
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: requestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export type setAppIsInitializedActionType = ReturnType<typeof setAppIsInitializedAC>
export const setAppIsInitializedAC = (isInitialized: boolean) => ({
    type: "APP/SET-IS-INITIALIZED-STATUS",
    isInitialized
} as const)

//THUNKS
export const initializeAppTC = () => (dispatch: Dispatch<dispatchType>) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
        }
        dispatch(setAppIsInitializedAC(true))
    })
}

export type requestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type initialStateAppReducerType = {
    // происходит ли сейчас взаимодействие с сервером
    status: requestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // инициализация приложения
    isInitialized: boolean
}
type actionsType =
    setAppIsInitializedActionType
    | setAppErrorActionType
    | setAppStatusActionType
    | setIsLoggedInActionType

type dispatchType = actionsType

export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type actionsStatusAppErrorTypes =
    setAppErrorACType
    | setAppStatusACType
    | setAppIsInitializedActionType
