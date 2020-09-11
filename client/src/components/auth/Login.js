import React from 'react'
import { connect } from 'react-redux'

import { startLoginUser } from '../../actions/userAction'

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        //console.log('Login component',formData)
        const redirect = () => {
            this.props.history.push('/')
        }
        this.props.dispatch(startLoginUser(formData, redirect))
    }

    render() {
        return(
            <div>
                <h1> Login Now </h1>
                <form onSubmit = { this.handleSubmit } >
                    <label htmlFor = "email"> Email </label>
                    <input 
                        type = "text" 
                        id = "email" 
                        name = "email"
                        value = { this.state.email } 
                        onChange = { this.handleChange } 
                    /> <br/>

                    <label htmlFor = "password" > Password </label>
                    <input 
                        type = "password" 
                        id ="password"
                        name = "password" 
                        value = { this.state.password } 
                        onChange = { this.handleChange } 
                    /> <br/>

                    <input type = "submit" value = "Login" />
                </form>
            </div>
        )
    }
}

export default connect()(Login)