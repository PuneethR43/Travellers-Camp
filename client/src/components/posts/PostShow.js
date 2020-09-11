import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { startGetAllUser } from '../../actions/userAction'
import CommentsForm from '../comments/CommentsForm'
import { startGetComments } from '../../actions/postsAction'
import { selectComment } from '../../selectors/selectComment'

class PostShow extends React.Component{

    componentDidMount(){
        if(this.props.allUsers.length === 0){
            this.props.dispatch(startGetAllUser())
        }
        this.props.dispatch(startGetComments())

    }

    render(){
        
        let createdAt = this.props.post?.createdAt
        // console.log(this.props.comments)
        return(
            
            <div>
                <h1> Post Show </h1>
                {
                    <div>
                        <h3>TITLE : </h3>
                        <p>{this.props.post?.title}</p>
                        <h3>BODY :</h3>
                        <p>{this.props.post?.body } {moment(createdAt).format('LLLL')}</p>
                        <h3>USER NAME : </h3>
                        <p> <Link to = {`/user/posts/${this.props.singleUser?._id}`} > 
                            {this.props.singleUser?.username} </Link> </p>
                        <hr/>
                        {<ul>{
                            this.props.post?.comments.map((ele) => {
                               return <li>{ele.body}</li>
                            })
                            }
                        </ul>
                        }
                        <CommentsForm data = {this.props.post?._id} />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {

    const post = state.posts.find((post) => post._id == props.match.params.id)
    return{
        post,
        allUsers :  state.allUsers,
        singleUser : state.allUsers.find((user) => user._id == post?.userId),
        comments : state.comments
    }
}

export default connect(mapStateToProps)(PostShow)