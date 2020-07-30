import React, {ChangeEvent, useCallback} from "react"
import {Checkbox, IconButton} from "@material-ui/core"
import {EditableSpan} from "./EditableSpan"
import DeleteIcon from "@material-ui/icons/Delete"
import {taskStatusesEnum, taskType} from "./api/todolists-api"

type taskListType = {
    todoListId: string
    task: taskType
    removeTask: (id: string, todoList: string) => void
    changeTaskStatus: (id: string, status: taskStatusesEnum, todoList: string) => void
    changeTitle: (taskId: string, newTitle: string, todoListId: string) => void

}
export const Task = React.memo((props: taskListType) => {

    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todoListId)
    }, [props.task.id, props.todoListId])

    // Функция следит за событием на чек боксе таски и отдает значение в стейт
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newTaskStatusValue =  e.currentTarget.checked
        props.changeTaskStatus(props.task.id,
            newTaskStatusValue ? taskStatusesEnum.Completed : taskStatusesEnum.New,
            props.todoListId)
    }, [props.task.id, props.todoListId])

    const onChangeTaskTitle = useCallback((newValue: string) => {
        props.changeTitle(props.task.id, newValue, props.todoListId)
    }, [props.changeTitle, props.task.id, props.todoListId])

    /*Если таска выполнена, то класс "is-done" если нет, то класса нет*/
    return <div key={props.task.id}
                className={props.task.status === taskStatusesEnum.Completed ? "is-done" : ""}>
        <Checkbox checked={props.task.status === taskStatusesEnum.Completed}
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
