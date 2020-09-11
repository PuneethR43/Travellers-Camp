import React from 'react'
import { connect } from 'react-redux'
import { startRegisterUser } from '../../actions/userAction'

class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username : '',
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
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        const redirect = () => {
            return this.props.history.push('/api/user/login')
        }
        this.props.dispatch(startRegisterUser(formData, redirect))
    }

    render() {
        return(
            <div>
                <h1> Register with us </h1>
                <form onSubmit = { this.handleSubmit } >

                    <label htmlFor = "username"> User Name </label>
                    <input 
                        type = "text" 
                        id = "username"
                        name = "username" 
                        value = { this.state.username } 
                        onChange = { this.handleChange } 
                    /> <br/>

                    <label htmlFor = "email" > E-mail </label>
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
                        id = "password"
                        name = "password"
                        value = { this.state.password } 
                        onChange = { this.handleChange } 
                    /> <br/>

                    <input type = "submit" value = "Register" />
                </form>
            </div>
        )
    }
}

export default connect()(Register)