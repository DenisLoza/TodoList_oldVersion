import {tasksStateType} from "../App"
import {addTaskAC, updateTaskAC, removeTaskAC, setTasksAC, tasksReducer} from "./tasksReducer"
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todolistsReducer"
import {taskPrioritiesEnum, taskStatusesEnum} from "../api/todolists-api"


test ("correct task should be deleted from correct array", () => {
    const startState: tasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "React", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Redux", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Node JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "Bread", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "Beer", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Fish", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Chips", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ]
    }
// ActionCreator
    // что сделать: удали task с id="2" из "todoListId2"
    const action = removeTaskAC ("2", "todoListId2")
    // отправь стартовые данные из startState и отправь action в файл-редьюсер tasksReducer
    const endState = tasksReducer(startState, action)

// Получаем выходные данные из редьюсера и проверяем их
    // если на выходе длина массива "todoListId1" будет 5, т.е. как была изначально, то OK
    expect(endState["todoListId1"].length).toBe(5)
    // если на выходе длина массива "todoListId2" будет 4, т.е. уменьшена на 1, то OK
    expect(endState["todoListId2"].length).toBe(4)
    // если на выходе в массиве "todoListId2" НЕ будет таски с id="2", то OK
    // .every -> если каждый элемент массива НЕ равен "2", то вернет TRUE
    expect(endState["todoListId2"].every(t => t.id != "2")).toBeTruthy()
// Те же две проверки, что и с методом .every. Представленно для примера
    expect(endState["todoListId2"][0].id).toBe("1")
    expect(endState["todoListId2"][1].id).toBe("3")
})

test ("correct task should be added from correct array", () => {
    const startState: tasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "React", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Redux", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Node JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "Bread", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "Beer", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Fish", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Chips", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ]
    }
// ActionCreator
    // что сделать: добавить task с именем="newName" в начало "todoListId2"
    // const action = addTaskAC ("newName", "todoListId2")
    const action = addTaskAC({
        todoListId: "todoListId2",
        title: "newName",
        status: taskStatusesEnum.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id exist"
    })
    // отправь стартовые данные из startState и отправь action в файл-редьюсер tasksReducer
    const endState = tasksReducer(startState, action)

// Получаем выходные данные из редьюсера и проверяем их
    // если на выходе длина массива "todoListId1" будет 5, т.е. как была изначально, то OK
    expect(endState["todoListId1"].length).toBe(5)
    // если на выходе длина массива "todoListId2" будет 4, т.е. увеличена на 1, то OK
    expect(endState["todoListId2"].length).toBe(6)
    // первый элемент "todoListId2" с ключом id БУДЕТ ОПРЕДЕЛЕН (какое-либо значение)
    expect(endState["todoListId2"][0].id).toBeDefined()
    // первый элемент "todoListId2" с ключом title БУДЕТ "newName"
    expect(endState["todoListId2"][0].title).toBe("newName")
    // первый элемент "todoListId2" со статусом БУДЕТ 0(новая), как изначально.
    expect(endState["todoListId2"][0].status).toBe(taskStatusesEnum.New)
})

test ("status of specified task should be changed", () => {
    const startState: tasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "JS", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "React", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Redux", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Node JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "Bread", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "Beer", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Fish", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Chips", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ]
    }
// ActionCreator
    // что сделать: изменить статус task id="2" c Completed на New
    const action = updateTaskAC ("2", {status: taskStatusesEnum.New}, "todoListId2")
    // отправь стартовые данные из startState и отправь action в файл-редьюсер tasksReducer
    const endState = tasksReducer(startState, action)

// Получаем выходные данные из редьюсера и проверяем их
    // второй элемент "todoListId2" с ключом isDone БУДЕТ false.
    expect(endState["todoListId2"][1].status).toBe(taskStatusesEnum.New)
    // второй элемент "todoListId1" с ключом isDone БУДЕТ true, как заданно изначально.
    expect(endState["todoListId1"][1].status).toBe(taskStatusesEnum.Completed)
})

test ("title of specified task should be changed", () => {
    const startState: tasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "React", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Redux", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Node JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "Bread", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "Beer", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Fish", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Chips", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ]
    }
// ActionCreator
    // что сделать: изменить имя task на имя="newName" в "todoListId2"
    const action = updateTaskAC("2", {title: "newName"}, "todoListId2")
    // отправь стартовые данные из startState и отправь action в файл-редьюсер tasksReducer
    const endState = tasksReducer(startState, action)

// Получаем выходные данные из редьюсера и проверяем их
    // второй элемент "todoListId2" с ключом isDone БУДЕТ false.
    expect(endState["todoListId2"][1].title).toBe("newName")
    // второй элемент "todoListId1" с ключом isDone БУДЕТ true, как заданно изначально.
    expect(endState["todoListId1"][1].title).toBe("JS")
})

test ("new property with new array should be added when new todoList is added", () => {
    const startState: tasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "React", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Redux", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Node JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "Bread", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "Beer", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Fish", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Chips", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ]
    }
// ActionCreator
    // что сделать: изменить имя туду-листа на имя="newTodoList"
    const action = addTodoListAC({
        title: "newTodoList",
        id: "id",
        order: 0,
        addedDate: ""
    })
    // отправь стартовые данные из startState и отправь action в файл-редьюсер tasksReducer
    const endState = tasksReducer(startState, action)
    // в переменную keys запишем массив из всех ключей полученного массива объектов todoList с новым
    const keys = Object.keys(endState)
    //  в переменную newKey запишем имя нового todoList "newTodoList"
    const newKey = keys.find( k => k != "todoListId1" && k != "todoListId2")
    // если newKey НЕ существует, то отправь ошибку
    if (!newKey) {
        throw Error("new key should be added")
    }

// Получаем выходные данные из редьюсера и проверяем их
    // Количество todoList должно быть 3, т.е. добавляется еще один туду-лист
    expect(keys.length).toBe(3)
    // если в выходном массиве нашелся пустой массив с ключом newKey, то ОК
    expect(endState[newKey]).toEqual([])
})

test ("property with todolistId should be deleted", () => {
    const startState: tasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML & CSS", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "React", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Redux", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Node JS", todoListId: "todoListId1",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "2", title: "Bread", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "3", title: "Beer", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "4", title: "Fish", todoListId: "todoListId2",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
            {id: "5", title: "Chips", todoListId: "todoListId2",
                status: taskStatusesEnum.New, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""},
        ]
    }
    // ActionCreator
    // что сделать: удалить туду-лист с id="todoListId2"
    const action = removeTodoListAC("todoListId2")
    // отправь стартовые данные из startState и отправь action в файл-редьюсер tasksReducer
    const endState = tasksReducer(startState, action)
    // в переменную keys запишем массив из всех ключей полученного массива объектов todoList с новым
    const keys = Object.keys(endState)

// Получаем выходные данные из редьюсера и проверяем их
    // Количество todoList должно быть 1, т.е. удаляется один туду-лист
    expect(keys.length).toBe(1)
    // в выходном массиве НЕ должно быть массива с id="todoListId2", т.е. undefined
    expect(endState["todoListId2"]).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodoListsAC([
        {id: "1", title: "title 1", order: 0, addedDate: ""},
        {id: "2", title: "title 2", order: 0, addedDate: ""}
    ])

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolists', () => {
    const startState: tasksStateType = {
        "todoListId1": [
            {
                id: "1", title: "HTML & CSS", todoListId: "todoListId1",
                status: taskStatusesEnum.Completed, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            }
        ]
    }
    const action = setTasksAC(startState["todoListId1"], "todoListId1")

    const endState = tasksReducer({
        "todoListId2": [],
        "todoListId1": [],
    }, action)

    expect(endState["todoListId1"].length).toBe(1)
    expect(endState["todoListId2"].length).toBe(0)
})
