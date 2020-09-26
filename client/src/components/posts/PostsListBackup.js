import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import renderHTML from 'react-render-html' 

import { startGetPosts } from '../../actions/postsAction'

class PostsList extends React.Component{
    
    componentDidMount() {
        this.props.dispatch(startGetPosts())
    }

    render(){
        // width = "870px" height = "500"
        return(
            <div className="container-fluid" >
                
                {
                    this.props.posts.reverse().map((post) => 
                    {
                        return(
                            <div className="row">
                            <div className="col-md-2"></div>
                            <div className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded" style={{maxWidth: "840px"}}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                <img src={`http://localhost:5000/${post.image}`}  alt="" width = "300" height = "200"></img>
                                </div>
                            <div className="col-md-8">
                            <div className="card-body" >
                                    <span className="card-title">{ renderHTML(post.title) }</span>
                                    <p className="card-text">{ renderHTML(post.description) }</p>
                                    <p className="card-text"><small className="text-muted">Created {moment(post.createdAt).startOf('hour').fromNow()}</small></p>
                                    <Link to = { `/post/${post._id}` } className="card-title"> read more...</Link> 
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>

                            /* <div class="card bg-dark text-white">
                            <img src="..." class="card-img" alt="..."/>
                            <div class="card-img-overlay">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text">Last updated 3 mins ago</p>
                            </div>
                            </div>
                            </div> */
                        )  
                    })
                    
                }
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