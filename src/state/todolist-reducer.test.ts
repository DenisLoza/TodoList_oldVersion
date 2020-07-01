import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {filterValuesType, todoListType} from "../App";

// ТЕСТ. УДАЛЕНИЕ TODO ЛИСТА
test("correct todoList should be removed", () => {
    // генерируем персональный id для каждого объекта в массиве
    let todoListId1 = v1()
    let todoListId2 = v1()
    // Начальные значения: два объекта в массиве
    const startState: Array<todoListType> = [
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"}
    ]
    // на выход передаем: начальный стэйт и id объекта, который нужно будет удалить
    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))
    // проверочные значения: длинна полученного массива = 1 (один объекта)
    expect(endState.length).toBe(1)
    // проверочные значения: второй объект в массиве станет первым
    expect(endState[0].id).toBe(todoListId2)
})

// ТЕСТ. ДОБАВЛЕНИЕ TODO ЛИСТА
test("correct todoList should be added", () => {
    // генерируем персональный id для каждого объекта в массиве
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "New TodoList"
    // Начальные значения: два объекта в массиве
    const startState: Array<todoListType> = [
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"}
    ]
    // на выход передаем: начальный стэйт и id объекта, который нужно будет добавить
    const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))
    // проверочные значения: длинна полученного массива = 3 (добавится еще один объект)
    expect(endState.length).toBe(3)
    // проверочные значения: первый объект в массиве получит название "New TodoList"
    expect(endState[0].title).toBe(newTodoListTitle)
    // проверочные значения: первый объект в массиве получит filter "All"
    expect(endState[0].filter).toBe("All")
})

// ТЕСТ. ИЗМЕНЕНИЕ НАИМЕНОВАНИЯ TODO ЛИСТА
test("correct todoList should change it's name", () => {
    // генерируем персональный id для каждого объекта в массиве
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "New TodoList"
    // Начальные значения: два объекта в массиве
    const startState: Array<todoListType> = [
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"}
    ]
    const action = changeTodoListTitleAC(todoListId1, newTodoListTitle)
    // на выход передаем: начальный стэйт и id объекта, имя которого нужно будет изменить на newTodoListTitle
    const endState = todoListsReducer(startState, action)
    // проверочные значения: первый объект в массиве получит новое название "New TodoList"
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[1].title).toBe("What to buy")
})

// ТЕСТ. ИЗМЕНЕНИЕ ФИЛЬТРОВ (All | Active | Competed) TODO ЛИСТА
test("correct filter of todoList should be change", () => {
    // генерируем персональный id для каждого объекта в массиве
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newFilter: filterValuesType = "Completed"
    // Начальные значения: два объекта в массиве
    const startState: Array<todoListType> = [
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"}
    ]
    const action = changeTodoListFilterAC(newFilter, todoListId2)
    // на выход передаем: начальный стэйт и id объекта, фильтр которого нужно будет изменить на newFilter
    const endState = todoListsReducer(startState, action)
    // проверочные значения: первый объект массива будет иметь фильтр "All"
    expect(endState[0].filter).toBe("All")
    // проверочные значения: второй объект в массиве получит новое значение фильтра "Completed"
    expect(endState[1].filter).toBe(newFilter)
})
