import React from "react"
import {AddItemForm, addItemFormType} from "../components/AddItemForm/AddItemForm"
import {action} from "@storybook/addon-actions"

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}
const callback = action("Button 'ADD' was pressed inside the form")

export const AddItemFormBaseExample = (props: addItemFormType) => {
    return <AddItemForm addItem={callback}/>
}

export const AddItemFormDisabledExample = (props: addItemFormType) => {
    return <AddItemForm addItem={callback}
                        disabled={true}/>
}
