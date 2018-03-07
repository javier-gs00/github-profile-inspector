import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import './assets/style/style.less'

import fontawesome from '@fortawesome/fontawesome'
import { faSearch, faSpinner } from '@fortawesome/fontawesome-free-solid'

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import profileInspector from './reducers/reducer'

require('dotenv').config()

fontawesome.library.add(faSearch)

const store = createStore(
    profileInspector,
    applyMiddleware(
        thunkMiddleware
    )
)

ReactDOM.render(<App store={store}/>, document.getElementById('root'))