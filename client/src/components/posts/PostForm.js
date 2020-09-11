import React from 'react'
import { startCreatePost } from '../../actions/postsAction'
import { connect } from 'react-redux'

class PostForm extends React.Component{
    constructor(){
        super()
        this.state = {
            title : '',
            body : ''
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
            title : this.state.title,
            body : this.state.body
        }
        // console.log("form", formData)
        const redirect = () => {
            this.props.history.push("/myPosts")
        }
        this.props.dispatch(startCreatePost(formData, redirect))
    }

    render(){
        return(
            <div className ="form-group">
                <form onSubmit = {this.handleSubmit} >
                    <h3> TITLE:-</h3>
                    <textarea rows = "1" cols = "40" name = "title" value = {this.state.title} onChange = {this.handleChange} />
                    <h3> BODY:- </h3>
                    <textarea rows = "20" cols = "80" name = "body" value = {this.state.body} onChange = {this.handleChange} />
                    <input type = "submit" value = "Post" />
                </form>
            </div>
        )
    }
}


export default connect()(PostForm)