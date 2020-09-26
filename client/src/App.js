import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {GiBarracksTent} from 'react-icons/gi'

import Home from './components/static/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { startLogoutUser } from './actions/userAction'
//User
// import UserAccount from './components/user/UserAccount'
import UserEdit from './components/user/UserEdit'
//Posts
import PostsList from './components/posts/PostsList'
import MyPosts from './components/posts/MyPosts'
import PostShow from './components/posts/PostShow'
import PostForm from './components/posts/PostForm'
import UserPosts from './components/posts/UserPosts'
import PostEdit from './components/posts/PostEdit'

import './App.css'
import Landing from './components/static/Landing'

function App(props){

    const handleLogout = () => {
        props.dispatch(startLogoutUser())
    }

    return(
        <BrowserRouter>
         
            <div>
                {
                    Object.keys(props.user).length !== 0 && (
                        <div>
                        <nav className ="navbar navbar-expand-sm navbar-dark bg-dark" >
                        
                            <Link to = "/home" className="navbar-brand"> <GiBarracksTent/> </Link>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="#navbarMenu">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to = "/account" className="nav-link"> {props.user?.username}'s </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to = "/posts" className="nav-link"> Posts </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link to = "/myPosts" className="nav-link"> My Posts </Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link to = "/create" className="nav-link"> Create Post </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to = "/" onClick = { handleLogout } className="nav-link"> Logout </Link>
                                    </li>
                                </ul>
                            </div>
                        
                        </nav>
                        </div>
                    )
                }
                

                <Switch>
                    <Route path = "/" component = {Landing} exact = {true}/>
                    <Route path = "/home" component = {Home} exact = {true}/>
                    <Route path = "/api/user/register" component = {Register} />
                    <Route path = "/api/user/login" component = {Login} />
                    {/* Profile Route */}
                    <Route path = "/account" component = {UserEdit} />

                    {/* Pots Route */}
                    <Route path = "/posts" component = {PostsList} exact = {true} />
                    <Route path = "/myPosts" component = {MyPosts} />
                    <Route path = "/post/:id" component = {PostShow} />
                    <Route path = "/create" component = {PostForm} />
                    <Route path = "/user/posts/:userId" component = {UserPosts} />
                    <Route path = "/edit/post/:id" component = {PostEdit} />
                    
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

