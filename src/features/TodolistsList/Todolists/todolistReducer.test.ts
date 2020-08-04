import {v1} from "uuid"
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, filterValuesType,
    removeTodoListAC, setTodoListsAC, todoListDomainType,
    todolistsReducer,
} from "./todolistsReducer"
import {todolistType} from "../../../api/todolists-api"

let todoListId1: string
let todoListId2: string
let startState: Array<todoListDomainType> = []

// задаем значения, которые могут быть использованны любым тестом
beforeEach(() => {
    // генерируем персональный id для каждого объекта в массиве
    todoListId1 = v1()
    todoListId2 = v1()
    // Начальные значения: два объекта в массиве
    startState = [
        {id: todoListId1, title: "Whats to learn:", filter: "All", addedDate: "", order: 0},
        {id: todoListId2, title: "Whats to buy:", filter: "All", addedDate: "", order: 1}
    ]
})

// ТЕСТ. УДАЛЕНИЕ TODO ЛИСТА
test("correct todoList should be removed", () => {

    // на выход передаем: начальный стэйт и id объекта, который нужно будет удалить
    const endState = todolistsReducer(startState, removeTodoListAC(todoListId1))
    // проверочные значения: длинна полученного массива = 1 (один объекта)
    expect(endState.length).toBe(1)
    // проверочные значения: второй объект в массиве станет первым
    expect(endState[0].id).toBe(todoListId2)
})

// ТЕСТ. ДОБАВЛЕНИЕ TODO ЛИСТА
test("correct todoList should be added", () => {

    let todolist: todolistType = {
        title: "New TodoList",
        id: "id",
        order: 0,
        addedDate: ""
    }
    // на выход передаем: начальный стэйт и id объекта, который нужно будет добавить
    const endState = todolistsReducer(startState, addTodoListAC(todolist))
    // проверочные значения: длинна полученного массива = 3 (добавится еще один объект)
    expect(endState.length).toBe(3)
    // проверочные значения: первый объект в массиве получит название "New TodoList"
    expect(endState[0].title).toBe(todolist.title)
    // проверочные значения: первый объект в массиве получит filter "All"
    expect(endState[0].filter).toBe("All")
})

// ТЕСТ. ИЗМЕНЕНИЕ НАИМЕНОВАНИЯ TODO ЛИСТА
test("correct todoList should change it's name", () => {

    let todolist: todolistType = {
        title: "New TodoList",
        id: "id",
        order: 0,
        addedDate: ""
    }

    const action = changeTodoListTitleAC(todoListId1, todolist.title)
    // на выход передаем: начальный стэйт и id объекта, имя которого нужно будет изменить на newTodoListTitle
    const endState = todolistsReducer(startState, action)
    // проверочные значения: первый объект в массиве получит новое название "New TodoList"
    expect(endState[0].title).toBe(todolist.title)
    expect(endState[1].title).toBe("Whats to buy:")
})

// ТЕСТ. ИЗМЕНЕНИЕ ФИЛЬТРОВ (All | Active | Competed) TODO ЛИСТА
test("correct filter of todoList should be change", () => {

    let newFilter: filterValuesType = "Completed"

    const action = changeTodoListFilterAC(newFilter, todoListId2)
    // на выход передаем: начальный стэйт и id объекта, фильтр которого нужно будет изменить на newFilter
    const endState = todolistsReducer(startState, action)
    // проверочные значения: первый объект массива будет иметь фильтр "All"
    expect(endState[0].filter).toBe("All")
    // проверочные значения: второй объект в массиве получит новое значение фильтра "Completed"
    expect(endState[1].filter).toBe(newFilter)
})

test("todoLists should be set to the state", () => {
    // экшен является ф-цией, которая устанавливает стартовый стейт из 2-х объектов
    const action = setTodoListsAC(startState)
    // на выход передаем: пустой стэйт и экшен
    const endState = todolistsReducer([], action)
    // проверочные значения: в стейте будет сидеть два объекта
    expect(endState.length).toBe(2)
})
