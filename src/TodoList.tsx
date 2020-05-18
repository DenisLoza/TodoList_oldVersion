import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css';
import {FilterValuesType} from './App';


export type tasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: Array<tasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (NewTaskTitle: string) => void
}


export function TodoList(props: TodoListType) {

    // Хук3 следит за перерисовкой названия для новой задачи заданное через input
    let [NewTaskTitle, setNewTaskTitle] = useState("");

    // Функция добавляет новое название для задачи и обнуляет поле ввода после добавления названия новой задачи
    function addTask() {
        props.addTask(NewTaskTitle);
        setNewTaskTitle("");
    }

    /*При нажатии на кнопку "+" добавляется новая таска*/
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    /*При нажатии на Enter добавляется новая таска*/
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(NewTaskTitle);
            setNewTaskTitle("");
        }
    }

    const onAllClickHandler = () => props.changeFilter("All");
    const onActiveClickHandler = () => props.changeFilter("Active");
    const onCompletedClickHandler = () => props.changeFilter("Completed");

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={NewTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler} />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onRemoveHandler = () => {
                        props.removeTask(t.id);
                    }

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}