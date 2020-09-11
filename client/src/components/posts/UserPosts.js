import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class UserPosts extends React.Component{

    render(){
        // console.log("user posts", this.props.singleUser)
        // console.log("user posts", this.props.posts)
        return(
            <div>
                <h1>User Posts</h1>
                <ul>
                {
                    this.props.posts.map((post) => {
                        return (
                            <li key = {post._id}>
                               <Link to = { `/post/${post._id}` }> {post.title} </Link> 
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const user_id = props.match.params.userId
    return{
        allUsers : state.allUsers,
        // singleUser : state.allUsers.find((user) => user.id == user_id),
        posts : state.posts.filter((post) => post.userId === user_id)
    }
}

export default connect(mapStateToProps)(UserPosts)