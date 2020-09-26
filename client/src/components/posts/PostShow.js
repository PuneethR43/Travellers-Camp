import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {BsTrash} from 'react-icons/bs'
import {FaRegHandPointDown} from 'react-icons/fa'
import Avatar from 'react-avatar'
import { startGetAllUsers } from '../../actions/userAction'
import CommentsForm from '../comments/CommentsForm'
import { startGetComments, startGetPosts, startRemoveComment } from '../../actions/postsAction'

class PostShow extends React.Component{

    componentDidMount(){
        if(this.props.allUsers.length === 0){
            this.props.dispatch(startGetAllUsers())
        }
        if(this.props.comments.length === 0){
            this.props.dispatch(startGetComments())
        }
        this.props.dispatch(startGetPosts())
    }

    componentDidUpdate(){
        if(this.props.allUsers.length === 0){
            this.props.dispatch(startGetAllUsers())
        }
        if(this.props.comments.length === 0){
            this.props.dispatch(startGetComments())
        }
        this.props.dispatch(startGetPosts())
    }

    handleDeleteComment = (id) => {
        const commentID = id
        console.log(" delete commentID ", commentID)
        this.props.dispatch(startRemoveComment(id))
    }

    render(){
        
        let createdAt = this.props.post?.createdAt
        let title = this.props.post?.title
        let body = this.props.post?.body
        let description = this.props.post?.description
        // console.log("post show",body)
        return(
            
            <div className="container-fluid " >
                {
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="card col-md-8 shadow-lg" style={{margin:10}}>
                <h1 className="title">{title}</h1>
                            {
                                this.props.singleUser?.profile ? (
                                    <img src={`http://localhost:5000/${this.props.singleUser?.profile}`} 
                                        height="30" 
                                        width="30" 
                                        alt="Post" 
                                        className="rounded-circle"
                                    />
                                    ) : (
                                            <Avatar 
                                                color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} 
                                                name={this.props.singleUser?.username} 
                                                round={true} 
                                                textSizeRatio={1.75}
                                            />
                                        )
                                        
                            }
                            <p>{this.props.singleUser?.username}</p>
                            <h5>Description, <small className="text-muted">{moment(createdAt).format('ll')}</small></h5>

                            <p>{description}</p>
                            <img src={`http://localhost:5000/${this.props.post?.image}`} height="500" alt="Post"></img>

                            <p>{body}</p>
                        
                        <p>For more posts by {this.props.singleUser?.username} <Link to = {`/user/posts/${this.props.singleUser?._id}`} > 
                            click here </Link> </p>
                        <hr/>
                        <h6>Read {"&"} Add comments down here <FaRegHandPointDown/></h6>
                        {
                            <ul className="list-group list-group-flush ">
                                {
                                this.props.post?.comments.reverse().map((ele) => {
                                    let name = this.props.allUsers.find((user)=>{
                                                return user._id  ==  ele.userId
                                        })
                                    let comments = this.props.comments?.find(cmt => cmt._id == ele._id)
                                
                                if(comments?.body){
                                    return(
                                        <li className="list-group-item" style={{fontSize:"10"}}>  
                                            {comments?.body}
                                            <small className="text-muted"> by {name?.username} </small> 
                                        {
                                            this.props.user?._id == ele.userId&&(<div> 
                                                                                    <button onClick = {()=>this.handleDeleteComment(comments._id)} className="btn btn-outline-danger float-left"><BsTrash/></button>
                                                                                </div>)                    
                                        }
                                        </li>
                                    )
                                }
                                })
                            }
                        </ul>
                        }
                        <CommentsForm data = {this.props.post?._id} />
                        </div>
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
        comments : state.comments,
        user : state.users
    }
}

export default connect(mapStateToProps)(PostShow)