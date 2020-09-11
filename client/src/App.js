import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './components/static/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { startLogoutUser } from './actions/userAction'
//User
import UserAccount from './components/user/UserAccount'
//Posts
import PostsList from './components/posts/PostsList'
import MyPosts from './components/posts/MyPosts'
import PostShow from './components/posts/PostShow'
import PostForm from './components/posts/PostForm'
import UserPosts from './components/posts/UserPosts'
import PostEdit from './components/posts/PostEdit'

function App(props){

    const handleLogout = () => {
        props.dispatch(startLogoutUser())
    }

    return(
        <BrowserRouter>
         
            <div className = "container-fluid">
                
                {
                    Object.keys(props.user).length === 0 ? (
                        <nav className ="navbar navbar-dark bg-dark" >
                        <div>
                        <ul className ="nav">
                        <li className ="nav-item">
                        <Link to = "/" className = "nav-link"> Home </Link>
                        </li>
                        <li className ="nav-item">
                            <Link to = "/api/user/register" className = "nav-link">Register</Link>
                            
                        </li>
                        <li className ="nav-item">
                        <Link to = "/api/user/login"  className = "nav-link">Login </Link>
                        </li>
                        </ul>
                        </div>
                        </nav>
                        
                    ) : (
                        <nav className ="navbar navbar-dark bg-dark" >
                        <div>
                            <Link to = "/account"> Account |</Link>
                            <Link to = "/posts" > Posts |</Link>
                            <Link to = "/myPosts"> My Posts |</Link>
                            <Link to = "/create"> Create Post </Link>
                            <Link to = "#" onClick = { handleLogout } > Logout </Link>
                        </div>
                        </nav>
                    )
                }
                

                <Switch>
                    <Route path = "/" component = {Home} exact = {true}/>
                    <Route path = "/api/user/register" component = {Register} />
                    <Route path = "/api/user/login" component = {Login} />

                    <Route path = "/account" component = {UserAccount} />
                    {/* Pots Route */}
                    <Route path = "/posts" component = {PostsList} exact = {true} />
                    <Route path = "/myPosts" component = {MyPosts} />
                    <Route path = "/post/:id" component = {PostShow} />
                    <Route path = "/create" component = {PostForm} />
                    <Route path = "/user/posts/:userId" component = {UserPosts} />
                    <Route  path = "/edit/post/:id" component = {PostEdit} />
                </Switch>
            </div>
            
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.users
    }
}

export default connect(mapStateToProps)(App)