import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar'
import moment from'moment'
import { startGetPosts } from '../../actions/postsAction'
import { startGetAllUsers } from '../../actions/userAction'
import './layout/layout.css'
import {userAvatar} from '../../selectors/postAvatar'

class PostsList extends React.Component{
    state = {
            count : 3
        }
    
    componentDidMount() {
        this.props.dispatch(startGetPosts())
        this.props.dispatch(startGetAllUsers())
    }

    handleLoad = () => {
        this.setState((prevState) => {
            return {
                count : prevState.count+2
            }
        })
    }

    render(){
        // console.log("Posts List",this.props.allUsers?._id)
        return(
            <div className="container-fluid" >
                {
                    this.props.posts.reverse().slice(0, this.state.count).map((post) => 
                    {
                        let avatars = userAvatar(this.props.allUsers, post.userId)

                        return(
                            <div className="row">
                            <div className="col-md-2"></div>
                            <div className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded" style={{width:900}}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                <img src={`http://localhost:5000/${post.image}`}  alt="" width = "300" height = "280"></img>
                                </div>
                            <div className="col-md-8">
                            <div className="card-body" >
                                <span className="title">{ post.title }</span>
                                <p className="card-text">{ post.description }</p>
                                {
                                    avatars?.profile ? (
                                        <img src={`http://localhost:5000/${avatars?.profile}`} 
                                            height="40" 
                                            width="40" 
                                            alt="Post" 
                                            className="rounded-circle"
                                        />
                                        ) : (
                                                <Avatar 
                                                    color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} 
                                                    name={avatars?.username} 
                                                    round={true} 
                                                    textSizeRatio={1.75}
                                                />
                                            )
                                }
                                <h6>{avatars?.username}</h6>
                                <p className="card-text"><small className="text-muted">Created {moment(post.createdAt).startOf('hour').fromNow()}</small></p>
                                <Link to = { `/post/${post._id}` } className="card-title"> read more...</Link> 
                                
                                
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                                
                        )
                         
                    })
                }
                
                {
                    this.state.count < this.props.posts?.length && (<button onClick={this.handleLoad} className="btn btn-primary btn-lg">load more</button>)
                    
                }
                
            </div>
            
        )
        
    }
}

const mapStateToProps = (state) => {
    return{
        posts : state.posts,
        user : state.users,
        allUsers : state.allUsers
        // singleUser : state.allUsers.find((user) => user._id == state.posts?.userId)
    }
}

export default connect(mapStateToProps)(PostsList)