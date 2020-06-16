import {userReducer} from "./user-reducer";


test("user reducer should increment only age", () => {
    // описываем исходные значения state для теста
    const startState = {age: 20, childrenCount: 2, name: "Denis"}
    // описываем обработчик (начальные данные, тип экшена, т.е. какие инструкции выполнять)
    const endState = userReducer(startState, {type: "INCREMENT-AGE"})

// что должно быть на выходе после теста. expect(ожидание) .toBe(будет) такое-то значение
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test("user reducer should increment only childrenCount", () => {
    const startState = {age: 20, childrenCount: 2, name: "Denis"}
    const endState = userReducer(startState, {type: "INCREMENT-CHILDREN-COUNT"})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test("user reducer should change name of user", () => {
    const startState = {age: 20, childrenCount: 2, name: "Denis"}
    const newName = "Dan"
    // дополнительно с типом Action передаем новое значение, корое изменит name
    const endState = userReducer(startState, {type: "CHANGE-NAME", newName: newName})

    expect(endState.name).toBe(newName)
})

