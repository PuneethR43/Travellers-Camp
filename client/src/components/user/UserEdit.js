import React from 'react'
import { connect } from 'react-redux'
import { MDBInput } from 'mdbreact'
import UserAccount from './UserAccount'
import { startUpdateUser,startGetUser } from '../../actions/userAction'

class UserEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : props.users?.username,
            email : props.users?.email,
            about : props.users?props.users.about : null
        }
    }

    componentDidUpdate(){
        this.props.dispatch(startGetUser())
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
            about : this.state.about
        }
        const redirect = ()=>{
            return this.props.history.push('/account')
        }
        this.props.dispatch(startUpdateUser(formData, redirect))
    }

    render(){
        return(

            <div className="container-fluid">

                <div className="row">
                
                <div className="col-md-6" style={{marginTop:60}}>
                <form  className="text-center border border-dark p-5 myForm"  onSubmit = { this.handleSubmit } >
                    
                    <p className="h4 mb-4" >Edit</p>

                    <input 
                        type = "text" 
                        id = "username"
                        name = "username" 
                        value = { this.state.username } 
                        onChange = { this.handleChange }
                        required
                        placeholder="User Name"
                        className="form-control mb-4"
                    />

                    <input 
                        type="email" 
                        className="form-control mb-4" 
                        placeholder="E-mail"
                        required
                        id = "email"
                        name = "email"
                        value = { this.state.email } 
                        onChange = { this.handleChange }
                        placeholder = "e-mail"
                    />

                    <MDBInput
                        type="textarea"
                        rows="2"
                        placeholder="About"
                        icon="pencil" 
                        id = "about"
                        name = "about"
                        value = {this.state.about}
                        onChange = {this.handleChange} 
                    />

                    <input 
                        type="submit" 
                        value="Update"
                        className="btn btn-primary"
                        onClick={this.sendForm} 
                    />
                </form>
                </div>
                <div className="col-md-6"><UserAccount/> </div>
            </div>
            </div>
        )
    }
}

const mapStateProps = (state) => {
    return{
        users : state.users
    }
}

export default connect(mapStateProps)(UserEdit)