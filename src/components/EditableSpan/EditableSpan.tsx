import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {TextField} from "@material-ui/core"

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    // Хук следит за состоянием режима редактирования span OR input
    let [editMode, setEditMode] = useState<boolean>(false)
    // Хук следит за состоянием значения нового\старого наименования таски
    let [newTaskTitle, setNewTaskTitle] = useState<string>("")

    // Ф-ция активирует режим редактирования для span преобразовывая его в input
    const activateEditMode = () => {
        setEditMode(true)
        // В момент активации режима редактирования старое название таски появляется в окне input
        setNewTaskTitle(props.value)
    }
    // Ф-ция деактивирует режим редактирования для input преобразовывая его в span
    const activateViewMode = () => {
        setEditMode(false)
        // props.onChange(newTaskTitle)
    }

    // При нажатии на Enter (charCode=13) добавляется новая таска
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.onChange(newTaskTitle)
            activateViewMode()
        }
    }

    // Следит за событиями внутри input и передает вводимые значения в хук
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        editMode
            // В значение input подставляем наименование таски
            ? <TextField value={newTaskTitle}
                // Включает автофокус
                         autoFocus={true}
                // Если потерян фокус, то обычный режим отображения
                         onBlur={activateViewMode}
                // Передает введеные значения в input в локальный стейт
                         onChange={onNewTitleChangeHandler}
                // Действия при нажатии на Enter
                         onKeyPress={onKeyPressHandler}/>
            // При двойном клике на span активируется режим EditMode
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
})


