import React from "react"
import {Task} from "../features/TodolistsList/Todolists/Task/Task"
import {action} from "@storybook/addon-actions"
import {taskPrioritiesEnum, taskStatusesEnum} from "../api/todolists-api"


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
        <Task task={{id: "1", todoListId: "todoListId1", title: "HTML", status: taskStatusesEnum.Completed, startDate: "", deadline: "",
            addedDate: "", order: 0, priority: taskPrioritiesEnum.Low, description: ""}}
              todoListId={"todoListId1"}
              changeTaskStatus={changeTaskStatusCallback}
              changeTitle={changeTitleCallback}
              removeTask={removeTaskCallback}
        />
        <Task task={{id: "2", todoListId: "todoListId2", title: "CSS", status: taskStatusesEnum.New, startDate: "", deadline: "",
            addedDate: "", order: 0, priority: taskPrioritiesEnum.Low, description: ""}}
              todoListId={"todoListId2"}
              changeTaskStatus={changeTaskStatusCallback}
              changeTitle={changeTitleCallback}
              removeTask={removeTaskCallback}
        />
    </>
}
