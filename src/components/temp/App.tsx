import React, {useState} from "react"
import "../../app/App.css"
import {TodoList} from "../../features/Todo/Todolists/TodoList"
// Библиотека для генерации уникальных id
import {v1} from "uuid"
import {AddItemForm} from "../AddItemForm/AddItemForm"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {ClearAll} from "@material-ui/icons"
import {taskPrioritiesEnum, taskStatusesEnum, taskType} from "../../api/todolists-api"
import {filterValuesType, todoListDomainType} from "../../features/Todo/Todolists/todolistsReducer"


// export type todoListType ={
//   id: string
//   title: string
//   filter: filterValuesType
// }
export type tasksStateType = {
    [key: string]: Array<taskType>
}


function App() {

    // Генерируем id для каждого туду листа
    let todoListId1 = v1()
    let todoListId2 = v1()

    // Состояние всех туду листов. Хук useState
    let [todoList, setTodoList] = useState<Array<todoListDomainType>>([
        {id: todoListId1, title: "Whats to learn:", filter: "All", entityStatus: "idle", addedDate: "", order: 0},
        {id: todoListId2, title: "Whats to buy:", filter: "All", entityStatus: "idle", addedDate: "", order: 1}
    ])

    // ОТДЕЛЬНЫЙ todo List
    let [tasks, setTasks] = useState<tasksStateType>({
        [todoListId1]: [
            {
                id: v1(), todoListId: todoListId1, title: "HTML & CSS",
                status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
            {
                id: v1(), todoListId: todoListId1, title: "JavaScript",
                status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
            {
                id: v1(), todoListId: todoListId1, title: "React & Redux",
                status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
        ],
        [todoListId2]: [
            {
                id: v1(), todoListId: todoListId2, title: "Milk",
                status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
            {
                id: v1(), todoListId: todoListId2, title: "Bread",
                status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
            {
                id: v1(), todoListId: todoListId2, title: "Butter",
                status: taskStatusesEnum.InProgress, startDate: "", deadline: "",
                addedDate: "", order: 0, priority: taskPrioritiesEnum.Low,
                description: ""
            },
        ]
    })

    // фильтр тасок на удаление по нажатию клавиши Х взаимодействует с хук1
    function removeTask(id: string, todoListId: string) {
        // Через переменную todoList мы узнаем конкретный тудулист, например: todoListId1
        let todoList = tasks[todoListId]
        // Пропускаем через фильтр таску для конкретного тудулиста
        tasks[todoListId] = todoList.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    // Функция для обработки чекбокса таски выполнено или не выполнено
    function changeStatus(id: string, status: taskStatusesEnum, todoListId: string) {
        // достаем нужный массив по todoListId
        let todoTasks = tasks[todoListId]
        // ищем нужную таску
        let task = todoTasks.find(t => t.id === id)
        // изменим таску, если она нашлась
        if (task) {
            task.status = status
            // копируем массив тасок через деструктуризацию и отдаем в useState для перерисовки
            setTasks({...tasks})
        }
    }

    // Хук2 следит за состоянием списка тасок после нажатия кнопок all-active-completed
    let [filter, setFilter] = useState<filterValuesType>("All")

    // Функция передает значение по нажатию кнопок "all-active-completed" в ф-цию setFilter для хука2
    // function changeFilter(value: FilterValuesType) {
    //   setFilter(value);
    // }
    function changeFilter(value: filterValuesType, todoListId: string) {
        let todo = todoList.find(tl => tl.id === todoListId)
        if (todo) {
            todo.filter = value
        }
        setTodoList([...todoList])
    }

    // Функция добавления новой таски по клику на кнопку +
    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, todoListId: todoListId, status: taskStatusesEnum.New, startDate: "", deadline: "",
            addedDate: "", order: 0, priority: taskPrioritiesEnum.Low, description: ""}
        let todoList = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoList] /*Создаем новый массив добавляя новую таcку в начало и остальные таски из старого массива tasks*/
        setTasks({...tasks}) /*Отдаем новый полученный список тасок в useState для изменения*/
    }

    // Удаление Туду ЛИСТА целиком
    function removeTodoList(todoListId: string) {
        let newTodoList = todoList.filter(tl => tl.id !== todoListId)
        setTodoList(newTodoList)
        // Удаляем все таски в удаленном туду листе
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    // Функция добавления новой таски
    function addTodoList(title: string) {
        const newTodoListId: string = v1()
        const newTodoList: todoListDomainType = {
            id: newTodoListId,
            title: title,
            filter: "All",
            entityStatus: "idle",
            addedDate: "",
            order: 0
        }
        setTodoList([newTodoList, ...todoList])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    function changeTitle(taskId: string, newTitle: string, todoListId: string) {
        let task = tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const newTodoList = todoList.find(tl => tl.id === id)
        if (newTodoList) {
            newTodoList.title = newTitle
            setTodoList([...todoList])
        }
    }

    // Отрисовка списка тасок

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <ClearAll/>
                    </IconButton>
                    <Typography variant="h6">
                        ToDo
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoList.map(tl => {
                        // Фильтр тасок по нажатию кнопок completed - active
                        let tasksForTodoList = tasks[tl.id]
                        if (tl.filter === "Completed") {
                            tasksForTodoList = tasksForTodoList.filter(t => t.status === taskStatusesEnum.Completed)
                        }
                        if (tl.filter === "Active") {
                            tasksForTodoList = tasksForTodoList.filter(t => t.status === taskStatusesEnum.New)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList key={tl.id}
                                              todolist={tl}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              removeTodoList={removeTodoList}
                                              changeTitle={changeTitle}
                                              changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App
