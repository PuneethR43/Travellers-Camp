import React from 'react'
import {connect} from 'react-redux'
import { startGetMyPosts , startRemovePost, startEditPost} from '../../actions/postsAction'

class MyPosts extends React.Component{

    handleEdit = (id) => {
        const postID = id
       
        this.props.history.push(`/edit/post/${postID}`)
    }

    handleRemove = (id) => {
        const postID = id
        this.props.dispatch(startRemovePost(postID))
    }

    componentDidMount(){
        
        this.props.dispatch(startGetMyPosts())
    }
    render(){
        // console.log("My Posts", this.props.myPosts)
        return(
            <div>
                
                <h1>My Posts - { this.props.myPosts.length }</h1>
                <ul>
                    {
                        this.props.myPosts.reverse().map((posts) => {
                            return (
                            <li key = {posts._id}>
                                {posts.title}
                                <button onClick = {() =>this.handleEdit(posts._id)} className = "btn btn-secondary">Edit</button>
                                <button onClick = {() =>this.handleRemove(posts._id)} className = "btn btn-secondary" >Remove</button>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        myPosts: state.myPosts
    }
}

export default connect(mapStateToProps)(MyPosts)