import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRegisterUser } from '../../actions/userAction'
import { MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdbreact"

class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username : '',
            email : '',
            password : '',
            profile : ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleProfile = (e) => {
        this.setState({
            profile : e.target.files[0]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    
        const data = new FormData()

        data.append('username', this.state.username)
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        data.append('profile', this.state.profile)

        const redirect = () => {
            return this.props.history.push('/api/user/login')
        }
        this.props.dispatch(startRegisterUser(data, redirect))
    }

    render() {
        return(
            <div className="bg-login">
                <div className="container-fluid row"  >
                    <div className="col md-4"></div>
                    <div className="col md-4" style={{marginTop:70}}>
                <form  className="text-center border border p-5"  onSubmit = { this.handleSubmit } >
                    
                    <p className="h4 mb-4" >Sign up</p>
                    <input 
                        type="email" 
                        id="email" 
                        name = "email" 
                        className="form-control mb-4" 
                        placeholder="E-mail"  
                        value = { this.state.email } 
                        onChange = { this.handleChange }
                        required
                    />

                    <input 
                        type = "text" 
                        id = "username"
                        name = "username"
                        placeholder="User Name" 
                        className="form-control mb-4" 
                        value = { this.state.username } 
                        onChange = { this.handleChange } 
                        required
                    />

                    <input 
                        type="password" 
                        id="password" 
                        name = "password" 
                        className="form-control mb-4" 
                        placeholder="Password"  
                        value = { this.state.password } 
                        onChange = { this.handleChange }
                        required
                    />

                    <input 
                        type = "file" 
                        name="profile" 
                        onChange={this.handleProfile} 
                    />

                    <input 
                        type="submit" 
                        className="btn btn-info btn-block my-4" 
                    />
                    
                    <p>already have an account? sign in here
                        <Link to="/api/user/login"> Login </Link>
                    </p>
                   
                </form>
                </div>
                <div className="col md-4"></div>
            </div>
            </div>
        )
    }
}

export default connect()(Register)