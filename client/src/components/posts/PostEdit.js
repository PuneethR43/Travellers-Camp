import React from 'react'
import {connect} from 'react-redux'
import { startEditPost } from '../../actions/postsAction'


class PostEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title : props.post?.title,
            body : props.post?.body
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleCancel = () => {
        this.props.history.push('/myPosts')
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title : this.state.title,
            body : this.state.body
        }
        // console.log("edit", this.props.post._id)
        const redirect = () => {
            this.props.history.push('/myPosts')
        }
        this.props.dispatch(startEditPost(formData, this.props.post._id, redirect))
    }

    render(){
       
        return(
            <div>
                <h1>Edit Page</h1>
                <form onSubmit = {this.handleSubmit} >
                    <h3> TITLE:-</h3>
                    <textarea rows = "1" cols = "40" name = "title" value = {this.state.title} onChange = {this.handleChange} />
                    <h3> BODY:- </h3>
                    <textarea rows = "20" cols = "80" name = "body" value = {this.state.body} onChange = {this.handleChange} />
                    <input type = "submit" value = "Update" className = "btn btn-dark"/>
                    <button onClick = {this.handleCancel} className = "btn btn-dark">cancel</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const post_ID = props.match.params.id 
    return{
        post : state.posts.find((post) => post._id == post_ID)
        
    }
}

export default connect(mapStateToProps)(PostEdit)