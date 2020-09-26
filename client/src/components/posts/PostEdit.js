import React from 'react'
import {connect} from 'react-redux'
import {GiCancel} from 'react-icons/gi'
import { startEditPost,startGetPosts } from '../../actions/postsAction'


class PostEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title : props.post?.title,
            body : props.post?.body,
            description : props.post?.description
        }
    }
   
    componentDidUpdate(){
        this.props.dispatch(startGetPosts())
        
    }
    componentDidMount(){
        this.props.dispatch(startGetPosts())
    }

    handleTitle = (e) => {
        const title = e.target.value
        this.setState({
            title
        })
    }
    
    handleDescription = (e) => {
        const description = e.target.value
        this.setState({
            description
        })
    }

    handleBody = (e) => {
        const body = e.target.value
        this.setState({
            body
        })
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
            description : this.state.description,
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
            <div className="container-fluid row">
                <div className="col-md-2"></div>
                    <div className="card col-md-8"  style={{marginTop:50}}>
                    <div className="form-group shadow-textarea" style={{width:900,}}>
                        <form onSubmit = {this.handleSubmit}>
                            <label className="create-post"> Title </label>

                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                id="title"
                                value = {this.state.title} 
                                onChange = {this.handleChange}
                                className="input"
                            />
                            
                            <label className="create-post"> Description </label>
                            <textarea 
                                id = "description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                className="textarea"
                            />
                            
                            <label className="create-post"> Body </label>
                            <textarea
                                id = "body"
                                description="body"
                                value = {this.state.body} 
                                onChange = {this.handleChange}
                                className="textarea"
                            />

                            <input type = "submit" value = "Update" className = "btn btn-outline-secondary"/>
                            <button onClick = {this.handleCancel} className = "btn btn-outline-danger"><GiCancel/></button>
                        </form>
                    </div>
                    </div>
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