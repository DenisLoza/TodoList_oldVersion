import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import './AddItemForm.module.css'
import {Button, TextField} from "@material-ui/core"

type PropsType = {
    addItem: (NewTaskTitle: string) => void
}

export const AddItemForm = React.memo ((props: PropsType) => {
    // console.log("call AddItemForm")

    // Хук3 следит за перерисовкой названия для новой задачи заданное через input
    let [NewTaskTitle, setNewTaskTitle] = useState("")
    // Хук 4 следит за состоянием появления ошибок при проверках
    let [error, setError] = useState<string | null>(null) /*Изначально ошибки в стейте нет=null*/

    // Функция добавляет новое название для задачи и обнуляет поле ввода после добавления названия новой задачи
    function addItem() {
        console.log("call addItem")
        let trimedTitle = NewTaskTitle.trim() /*Функция убирает все пробелы из строки и то, что осталось засовывает в переменную */
        if (trimedTitle) {               /*Таска добавляется если строка не пустая*/
            props.addItem(trimedTitle) /*Добавляется таска, но убираются слева и справа все пробелы*/
            setNewTaskTitle("")
        } else {
            setError("Title is required!")
        }
    }

    /*Следит за событиями внутри input*/
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("call onNewTitleChangeHandler")
        if (error !== null) {
            setError(null) /*ХУК Стэйт3. Как только в поле ввода что-то попадает, ошибка ввода исчезает*/
        }
        setNewTaskTitle(e.currentTarget.value) /*ХУК Стэйт4. Передает все что в напечатано в input в переменную наименованя новой таски */
    }

    /*При нажатии на Enter (charCode=13) добавляется новая таска*/
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log("call onKeyPressHandler")
        if (e.charCode === 13) {
            console.log("run_onKeyPressHandler_ifCharCode=13")
            let trimedTitle = NewTaskTitle.trim()
            trimedTitle ? props.addItem(NewTaskTitle) : setError("Title is required!")
            setNewTaskTitle("")
        }
    }

    return (
        // Вывод названия Списка дел и поле ввода input с кнопкой "+"
        <div className="App">

            <div>
                <TextField label="add new ..."
                           value={NewTaskTitle}
                           id="standard-basic"
                           onChange={onNewTitleChangeHandler}
                           onKeyPress={onKeyPressHandler}
                    /*Если ошибка, то добавится класс "error: true", если нет, класс не добавиться*/
                           error={!!error}
                           helperText={error}
                />
                <Button onClick={addItem}
                        variant={"contained"}
                        color={"primary"}>+
                </Button>
            </div>
        </div>
    )
})
