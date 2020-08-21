import React, {useCallback, useEffect} from "react"
import "./App.css"
import {
    AppBar,
    Button,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
    Container,
    CircularProgress
} from "@material-ui/core"
import {ClearAll} from "@material-ui/icons"
import {TodolistList} from "../features/Todo/TodolistList"
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar"
import {appRootStateType} from "./store"
import {initializeAppTC, requestStatusType} from "./appReducer"
import {useDispatch, useSelector} from "react-redux"
import {BrowserRouter, Route} from "react-router-dom"
import {Login} from "../features/Login/Login"
import { logoutTC } from "../features/Login/AuthReducer"


function AppWithRedux({demo = false}: propsType) {

    const status = useSelector<appRootStateType, requestStatusType>((state) =>
        state.app.status)
    const isInitialized = useSelector<appRootStateType, boolean>((state) =>
        state.app.isInitialized)
    const isLoggedIn = useSelector<appRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])


    if (!isInitialized) {
        return <div style={{width: "100%", position: "fixed", top: "30%", textAlign: "center"}}>
            <CircularProgress/>
        </div>
    }
    // Отрисовка списка тасок
    return (
        <BrowserRouter>
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
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}> LogOut </Button>}
                    </Toolbar>
                    {status === "loading" && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={"/"} render={() => <TodolistList demo={demo}/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default AppWithRedux

type propsType = {
    demo?: boolean
}
