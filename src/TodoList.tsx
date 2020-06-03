import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

// Типизируем список тасок (id, название, состояние cheked)
export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
// Типизируем данные для всего Списка дел
type TodoListType = {
    id: string
    key: string
    title: string
    filter: FilterValuesType
    tasks: Array<tasksType>
    removeTask: (id: string, todoList: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (NewTaskTitle: string, todoList: string) => void
    changeTaskStatus:(id: string, isDone: boolean, todoList: string) => void
    addBoard: () => void
    removeTodoList: (todoListId: string) => void
    changeTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}


export function TodoList(props: TodoListType) {

    const addNewTask = (title: string) => {
        props.addTask(title, props.id)
    }
     // Ф-ция изменения названия титула списка задач
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle (props.id, newTitle)
    }

    const onAllClickHandler = () => props.changeFilter("All", props.id);
    const onActiveClickHandler = () => props.changeFilter("Active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id);

    // Удаление таски целиком
    const deleteTask = () => props.removeTodoList(props.id);

    return (
        // Вывод названия Списка дел и поле ввода input с кнопкой "+"
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodoListTitle}/></h3>
            <div className={"btn"}>
            <button className={"btn-new-todo"} onClick={props.addBoard}>+ New</button>
            <button className={"btn-del-todo"} onClick={deleteTask}>- Delete</button>
            </div>
            <AddItemForm addItem={addNewTask} />

            <ul>
                {props.tasks.map(t => {

                    const onRemoveHandler = () => {props.removeTask(t.id, props.id);}

                    // Функция следит за событием на чек боксе таски и отдает значение в стейт
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }

                    const onChangeTaskTitle = (newValue: string) => {
                        props.changeTitle(t.id, newValue, props.id)
                    }

                    /*Если таска выполнена, то класс "is-done" если нет, то класса нет*/
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}
                        />
                        <EditableSpan value={t.title} onChange={onChangeTaskTitle}/>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "Completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}