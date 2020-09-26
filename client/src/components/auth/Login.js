import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
// import { facebook-f } from 'mdbreact'
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
            this.props.history.push('/home')
        }
        this.props.dispatch(startLoginUser(formData, redirect))
    }
    
    render() {
        return(
            <div className="bg-login">
                <div className="container-fluid row"  >
                    
                    <div className="col md-4"></div>
                    <div className="col md-4" style={{marginTop:90}}>
                        
                <form  className="text-center border border p-5"  onSubmit = { this.handleSubmit } >
                
                    <p className="h4 mb-4" >Sign in</p>
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
                        type="submit" 
                        className="btn btn-info btn-block my-4" 
                    />
                    <p>Not a member?
                        <Link to="/api/user/register"> Register </Link>
                    </p>
                   
                    <p>also login with</p>
                    <a href="https://www.facebook.com/" > <i className="fab fa-facebook-f light-blue-text"></i> <FaFacebook/></a>
                    <a href="https://twitter.com/login?lang=en" > <i className="fab fa-twitter light-blue-text"></i> <FaTwitter/></a>
                    <a href="https://www.linkedin.com/login" > <i className="fab fa-linkedin-in light-blue-text"></i> <FaLinkedin/></a>
                    <a href="https://github.com/login" > <i className="fab fa-github light-blue-text"></i> <FaGithub/></a>
                    {/* <i class="fab fa-facebook-f light-blue-text"></i> */}
                </form>
                </div>
                <div className="col md-4"></div>
            </div>
            </div>
        )
    }
}

export default connect()(Login)