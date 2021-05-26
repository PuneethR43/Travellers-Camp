import React from 'react'

import { startCreatePost } from '../../actions/postsAction'
import { connect } from 'react-redux'

class PostForm extends React.Component{
    constructor(){
        super()
        this.state = {
            title : '',
            description : '',
            body : '',
            image : ''
        }
    }
  
    handleTitle = (e) => {
        const title = e.target.value
        this.setState({
          title 
        })
    }

    handleBody = (e) => {
        const body = e.target.value
        this.setState({
          body 
        })
    }

    handleDescription = (e) => {
        const description = e.target.value
        this.setState({
            description
        })
    }

    handleImage = (e) => {
        this.setState({
            image : e.target.files[0]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()

        data.append('title', this.state.title)
        data.append('description', this.state.description)
        data.append('body', this.state.body)
        data.append('image', this.state.image)

        const redirect = () => {
            this.props.history.push("/myPosts")
        }
        this.props.dispatch(startCreatePost(data, redirect))
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="card col-md-8"  style={{marginTop:50}}>
                <div className="form-group shadow-textarea" style={{width:900,}}>
                
                    <form onSubmit = {this.handleSubmit}>
                    <label className="create-post"> Title </label>
                    
                    <input 
                        type="text" 
                        id="fname" 
                        name="fname" 
                        value = {this.state.title} 
                        onChange = {this.handleTitle}
                        placeholder = "Give a Title"
                        className = "input"
                    />
                    
                    <label className="create-post"> Description </label>
                    <textarea 
                        placeholder="Describe your post..."
                        value={this.state.description}
                        onChange={this.handleDescription}
                        className="textarea"
                    />
                    
                    <label className="create-post"> Body </label>
                    <textarea
                        placeholder="Write Something..."
                        value = {this.state.body} 
                        onChange = {this.handleBody}
                        className="textarea"
                    />

                    <input type = "file" name = "image"  onChange = {this.handleImage}/>

                    <input type = "submit" className="btn btn-primary" value = "Post" />
                    </form>
            </div>
            </div>
            </div>
        )
    }
}


export default connect()(PostForm)