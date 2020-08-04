import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/temp/App'
import * as serviceWorker from './serviceWorker'
import AppWithRedusers from "./components/temp/AppWithRedusers";
import AppWithRedux from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./app/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <AppWithRedux/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
