import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' 
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'
import configureStore from './store/configureStore'
import { startGetUser, startGetAllUsers } from './actions/userAction'

import { startGetPosts, startGetMyPosts } from './actions/postsAction'

import { startGetComments } from './actions/postsAction'

const store = configureStore()
console.log(store.getState())

store.subscribe(() => {
    console.log(console.log(store.getState()))
})

//handle page reloads
if(localStorage.getItem('Authorization')){
    store.dispatch(startGetUser())
    store.dispatch(startGetAllUsers())
    store.dispatch(startGetPosts())
    store.dispatch(startGetMyPosts())
    store.dispatch(startGetComments())
}

const jsx = (
    <Provider store = {store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))