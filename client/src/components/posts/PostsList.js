import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { startGetPosts } from '../../actions/postsAction'
//import { selectCommentUser } from '../../selectors/selectCommentUser'

class PostsList extends React.Component{
    

    componentDidMount() {
        if(this.props.posts.length === 0) {
            this.props.dispatch(startGetPosts())
        }
        this.props.dispatch(startGetPosts())
    }

    render(){
        return(
            <div>
                <h1>Posts List - { this.props.posts.length }</h1>
                <ul>
                {
                    this.props.posts.reverse().map((post) => 
                    {
                        return(
                            <li key = {post._id}>
                                <Link to = { `/post/${post._id}` }> { post.title } </Link>
                                {moment(post.createdAt).format('LLLL')}
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
        posts : state.posts,
        user : state.users
    }
}

export default connect(mapStateToProps)(PostsList)