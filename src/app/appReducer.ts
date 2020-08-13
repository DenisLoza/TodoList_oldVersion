

const initialState: initialStateAppReducerType = {
    status: "idle",
    error: null
}

export const appReducer = (state= initialState, action: actionsStatusAppErrorTypes): initialStateAppReducerType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return {...state}
    }
}
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setAppStatusAC = (status: requestStatusType) => ({type: "APP/SET-STATUS", status} as const)

export type requestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type initialStateAppReducerType = {
    // происходит ли сейчас взаимодействие с сервером
    status: requestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
}
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type actionsStatusAppErrorTypes =
    setAppErrorACType
    | setAppStatusACType
