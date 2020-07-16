import React from "react"
import {EditableSpan} from "../EditableSpan"
import {action} from "@storybook/addon-actions"


export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const onChangeCallback = action("Value changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan value={"dubble click for change value name"} onChange={onChangeCallback} />
}
