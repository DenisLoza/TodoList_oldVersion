import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css';
import {FilterValuesType} from './App';

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
}


export function TodoList(props: TodoListType) {

    // Хук3 следит за перерисовкой названия для новой задачи заданное через input
    let [NewTaskTitle, setNewTaskTitle] = useState("");
    // Хук 4 следит за состоянием появления ошибок при проверках
    let [error, setError] = useState<string|null>(null); /*Изначально ошибки в стейте нет=null*/

    // Функция добавляет новое название для задачи и обнуляет поле ввода после добавления названия новой задачи
    function addTask() {
        let trimedTitle = NewTaskTitle.trim(); /*Функция убирает все пробелы из строки и то, что осталось засовывает в переменную */
        if (trimedTitle) {               /*Таска добавляется если строка не пустая*/
            props.addTask(trimedTitle, props.id); /*Добавляется таска, но убираются слева и справа все пробелы*/
        } else {
            setError("Title is required!")
        }
        setNewTaskTitle("");
    }

    /*Следит за событиями внутри input*/
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null); /*ХУК Стэйт3. Как только в поле ввода что-то попадает, ошибка ввода исчезает*/
        setNewTaskTitle(e.currentTarget.value) /*ХУК Стэйт4. Передает все что в напечатано в input в переменную наименованя новой таски */
    }

    /*При нажатии на Enter (charCode=13) добавляется новая таска*/
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(NewTaskTitle, props.id);
            setNewTaskTitle("");
        }
    }



    const onAllClickHandler = () => props.changeFilter("All", props.id);
    const onActiveClickHandler = () => props.changeFilter("Active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id);

    // Удаление таски целиком
    const deleteTask = () => props.removeTodoList(props.id);

    return (
        // Вывод названия Списка дел и поле ввода input с кнопкой "+"
        <div>
            <h3>{props.title}</h3>
            <div className={"btn"}>
            <button className={"btn-new-todo"} onClick={props.addBoard}>+ New</button>
            <button className={"btn-del-todo"} onClick={deleteTask}>- Delete</button>
            </div>
            <div>
                <input value={NewTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                    /*Если ошибка, то к input добавится класс "error", если нет, класс не добавиться*/
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {/*Если ошибка, в div добавится класс error-message и напишется содержимое переменной error*/}
                {error && <div className={"error-message"}>{error}</div>}
            </div>

            {/*Формирование списка тасок*/}
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => {props.removeTask(t.id, props.id);}

                    // Функция следит за событием на чек боксе таски и отдает значение в стейт
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    /*Если таска выполнена, то класс "is-done" если нет, то класса нет*/
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}
                        />
                        <span>{t.title}</span>
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