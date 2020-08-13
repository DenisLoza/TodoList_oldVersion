import React from "react"
import "./App.css"
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core"
import {ClearAll} from "@material-ui/icons"
import {TodolistList} from "../features/TodolistsList/TodolistList"
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar"
import {appRootStateType} from "./store"
import {requestStatusType} from "./appReducer"
import {useSelector} from "react-redux"


function AppWithRedux({demo = false}: propsType) {

    const status = useSelector<appRootStateType, requestStatusType>((state) =>
        state.app.status)
    // Отрисовка списка тасок
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <ClearAll/>
                    </IconButton>
                    <Typography variant="h6">
                        ToDo
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <TodolistList demo={demo}/>
        </div>
    )
}

export default AppWithRedux

type propsType = {
    demo?: boolean
}
