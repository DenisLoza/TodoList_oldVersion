import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {taskType} from "./TodoList";

type taskListType = {
    todoListId: string
    task: taskType
    removeTask: (id: string, todoList: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoList: string) => void
    changeTitle: (taskId: string, newTitle: string, todoListId: string) => void

}
export const Task = React.memo((props: taskListType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todoListId)
    }

    // Функция следит за событием на чек боксе таски и отдает значение в стейт
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }

    const onChangeTaskTitle = useCallback((newValue: string) => {
        props.changeTitle(props.task.id, newValue, props.todoListId)
    }, [props.changeTitle, props.task.id, props.todoListId])

    /*Если таска выполнена, то класс "is-done" если нет, то класса нет*/
    return <div key={props.task.id}
                className={props.task.isDone ? "is-done" : ""}>
        <Checkbox checked={props.task.isDone}
                  color={"primary"}
                  onChange={onChangeHandler}
        />
        <EditableSpan value={props.task.title}
                      onChange={onChangeTaskTitle}
        />
        <IconButton aria-label="delete"
                    onClick={onRemoveHandler}>
            <DeleteIcon fontSize="small"/>
        </IconButton>
    </div>
})
