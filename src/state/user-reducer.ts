type stateType = {
    age: number
    childrenCount: number
    name: string
}
type actionType = {
    type: string // Тип для Action обязателен!!!
    // у ActionType может быть любое дополнительное св-во типа string
    [key: string]: any
}


export const userReducer = (state: stateType, action: actionType): stateType => {
    switch (action.type) {
        case "INCREMENT-AGE":
            // создаем копию объекта testState и работаем с ней
            // ПРАВИЛО ИМУТАБЕЛЬНОСТИ - нельзя изменять исходные данные
            let test1State: stateType = {...state}
            test1State.age = state.age + 1;
            return test1State

        case "INCREMENT-CHILDREN-COUNT":
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }

        case "CHANGE-NAME":
            return {
                ...state,
                name: action.newName
            }

        default:
            throw new Error("I don't understand this action type!")
    }
}
