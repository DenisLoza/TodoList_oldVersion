import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './AddItemForm.module.css';


type PropsType = {
    addItem: (NewTaskTitle: string) => void
}


export function AddItemForm(props: PropsType) {

    // Хук3 следит за перерисовкой названия для новой задачи заданное через input
    let [NewTaskTitle, setNewTaskTitle] = useState("");
    // Хук 4 следит за состоянием появления ошибок при проверках
    let [error, setError] = useState<string|null>(null); /*Изначально ошибки в стейте нет=null*/

    // Функция добавляет новое название для задачи и обнуляет поле ввода после добавления названия новой задачи
    function addItem() {
        let trimedTitle = NewTaskTitle.trim(); /*Функция убирает все пробелы из строки и то, что осталось засовывает в переменную */
        if (trimedTitle) {               /*Таска добавляется если строка не пустая*/
            props.addItem(trimedTitle); /*Добавляется таска, но убираются слева и справа все пробелы*/
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
            props.addItem(NewTaskTitle);
            setNewTaskTitle("");
        }
    }


    return (
        // Вывод названия Списка дел и поле ввода input с кнопкой "+"
        <div>
            <div className={"btn"}>
            {/*<button className={"btn-new-todo"} onClick={props.addBoard}>+ New</button>*/}
            </div>
            <div>
                <input value={NewTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                    /*Если ошибка, то к input добавится класс "error", если нет, класс не добавиться*/
                       className={error ? "error" : ""}/>
                <button onClick={addItem}>+</button>
                {/*Если ошибка, в div добавится класс error-message и напишется содержимое переменной error*/}
                {error && <div className={"error-message"}>{error}</div>}
            </div>
        </div>
    )
}