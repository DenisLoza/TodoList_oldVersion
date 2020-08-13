import {setAppErrorAC, setAppErrorACType, setAppStatusAC, setAppStatusACType} from "../app/appReducer"
import {Dispatch} from "redux"
import {responseType} from "../api/todolists-api"

export const handleServerAppError = <D>(data: responseType<D>, dispatch: Dispatch<setAppStatusACType | setAppErrorACType>) => {
    // если при запросе в ответе серевера есть сообщение(т.е. его длинна больше 0), тогда добавь таску
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("some error"))
    }
    dispatch(setAppStatusAC("failed"))
}
export const handleServerNetworkError = (error: any, dispatch: Dispatch<setAppStatusACType | setAppErrorACType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : "unexpected error"))
    dispatch(setAppStatusAC("succeeded"))
}
