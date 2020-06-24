import React, {ChangeEvent} from 'react';
import './TodoList.css';
import {filterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';


// Типизируем список тасок (id, название, состояние checked)
export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
// Типизируем данные для всего Списка дел
type todoListType = {
    id: string
    key: string
    title: string
    filter: filterValuesType
    tasks: Array<tasksType>
    removeTask: (id: string, todoList: string) => void
    changeFilter: (value: filterValuesType, todoListId: string) => void
    addTask: (NewTaskTitle: string, todoList: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoList: string) => void
    removeTodoList: (todoListId: string) => void
    changeTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}


export function TodoList(props: todoListType) {

    const addNewTask = (title: string) => {
        props.addTask(title, props.id)
    }
    // Ф-ция изменения названия титула списка задач
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id)

    // Удаление таски целиком
    const deleteTask = () => props.removeTodoList(props.id)

    return (
        // Вывод названия Списка дел и поле ввода input с кнопкой "+"
        <div>
            <h3><EditableSpan value={props.title}
                              onChange={changeTodoListTitle}/>
                <IconButton aria-label="delete"
                            onClick={deleteTask}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addNewTask}/>

            <div>
                {props.tasks.map(t => {

                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }

                    // Функция следит за событием на чек боксе таски и отдает значение в стейт
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTaskTitle = (newValue: string) => {
                        props.changeTitle(t.id, newValue, props.id)
                    }

                    /*Если таска выполнена, то класс "is-done" если нет, то класса нет*/
                    return <div key={t.id}
                                className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone}
                                  color={"primary"}
                                  onChange={onChangeHandler}
                        />
                        <EditableSpan value={t.title}
                                      onChange={onChangeTaskTitle}
                        />
                        <IconButton aria-label="delete"
                                    onClick={onRemoveHandler}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </div>
                })
                }
            </div>
            <div style={{paddingTop: "20px"}}>
                <Button variant={props.filter === "All" ? "outlined" : "text"}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "Active" ? "outlined" : "text"}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "Completed" ? "outlined" : "text"}
                        color={"secondary"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
