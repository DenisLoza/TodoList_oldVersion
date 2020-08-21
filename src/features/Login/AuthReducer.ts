import {Dispatch} from "redux"
import {setAppStatusACType, setAppErrorACType, setAppStatusAC} from "../../app/appReducer"
import {authAPI, loginParamsType} from "../../api/todolists-api"
import {handleServerAppError, handleServerNetworkError} from "../../Utils/errorUtils"


const initialState: initialStateType = {
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}
// ACTIONS
export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => {
    return {type: "login/SET-IS-LOGGED-IN", value: value} as const
}


// THUNK CREATOR ф-ции (возвращают Thunk)

export const loginTC = (data: loginParamsType) => {
    return (dispatch: dispatchType) => {
        // показываем прогресс загрузки
        dispatch(setAppStatusAC("loading"))
        authAPI.login(data)
            .then((res) => {
                // если при запросе ответ серевера 0, тогда добавь таску
                if (res.data.resultCode === 0) {
                    // передаем в стейт положительный факт логинизации пользователя
                    dispatch(setIsLoggedInAC(true))
                    // убираем показ прогресса загрузки
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })

    }
}
export const logoutTC = () => {
    return (dispatch: dispatchType) => {
        // показываем прогресс загрузки
        dispatch(setAppStatusAC("loading"))
        authAPI.logout()
            .then((res) => {
                // если при запросе ответ серевера 0, тогда добавь таску
                if (res.data.resultCode === 0) {
                    // передаем в стейт отрицательный факт логинизации пользователя
                    dispatch(setIsLoggedInAC(false))
                    // убираем показ прогресса загрузки
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })

    }
}

// TYPES
type initialStateType = {
    isLoggedIn: boolean
}

type actionsType =
    setIsLoggedInActionType

type dispatchType = Dispatch<actionsType | setAppStatusACType | setAppErrorACType>
