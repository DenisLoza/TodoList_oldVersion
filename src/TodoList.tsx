import React, { useState } from 'react';
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
    addTask: (title: string) => void
}


export function TodoList(props: TodoListType) {

    // Хук3 следит за перерисовкой названия для новой задачи
    let [title, setTitle] = useState("");

    // Функция добавляет новое название для задачи и обнуляет поле ввода после добавления названия новой задачи
    function addTask(title: string) {
        props.addTask(title);
        setTitle("");
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={(e) => {setTitle(e.currentTarget.value)}}
                       type="text"
                       name=""
                       id=""/>
                <button onClick={() => addTask(title)}>+</button>
            </div>
            <ul>
                {props.tasks.map(t =>
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTask(t.id)
                        }}>x
                        </button>
                    </li>
                )
                }
                {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li> */}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}