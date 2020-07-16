import React from "react"
import {Task} from "../Task"
import {action} from "@storybook/addon-actions"


export default {
    title: "Task Component",
    component: Task
}
const changeTaskStatusCallback = action("Status changed")
const changeTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")

export const TaskBaseExample = () => {
    return <>
              {/*передаем тестовый объект в task*/}
        <Task task={{id: "1", title: "HTML", isDone: true}}
              todoListId={"todoListId1"}
              changeTaskStatus={changeTaskStatusCallback}
              changeTitle={changeTitleCallback}
              removeTask={removeTaskCallback}
        />
        <Task task={{id: "2", title: "CSS", isDone: false}}
              todoListId={"todoListId2"}
              changeTaskStatus={changeTaskStatusCallback}
              changeTitle={changeTitleCallback}
              removeTask={removeTaskCallback}
        />
    </>
}
