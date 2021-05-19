import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'

class UserPosts extends React.Component{

    render(){
        return(
            <div className="container-fluid">
                <h2 style={{textAlign:"center"}}>Posts by {this.props.singleUser?.username}</h2>
                {
                    this.props.posts.reverse().map((post) => 
                    {
                        return(
                            
                            <div class="row">
                            <div className="col-md-2"></div>
                            
                            <div className="col-md-8 mt-2 mb-4 shadow-lg card">
                                
                                <img src={`http://localhost:5000/${post.image}`}  alt="" width = "870px" height = "400"></img>
                                <div className="card-body" >
                                    <span className="card-title title">{ post.title }</span>
                                    <p className="card-text">{ post.description }</p>
                                    <p className="card-text"><small className="text-muted">Created {moment(post.createdAt).startOf('hour').fromNow()}</small></p>
                                    <Link to = { `/post/${post._id}` } className="card-title"> read more...</Link> 
                               </div>
                            </div>
                            </div>
                        )  
                    })
                    
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const user_id = props.match.params.userId
    return{
        allUsers : state.allUsers,
        singleUser : state.allUsers.find((user) => user._id == user_id),
        posts : state.posts.filter((post) => post.userId === user_id)
    }
}

export default connect(mapStateToProps)(UserPosts)