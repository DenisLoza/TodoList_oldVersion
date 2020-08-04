import React from "react"
import "./App.css"
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core"
import {ClearAll} from "@material-ui/icons"
import {TodolistList} from "../features/TodolistsList/TodolistList"


function AppWithRedux() {

  // Отрисовка списка тасок
  return (
      <div className="App">
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
        </AppBar>
        <TodolistList />
      </div>
  )
}

export default AppWithRedux
