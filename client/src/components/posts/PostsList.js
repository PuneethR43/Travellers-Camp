import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar'
import moment from'moment'
import InfiniteScroll from 'react-infinite-scroll-component'

import { startGetPosts } from '../../actions/postsAction'
import { startGetAllUsers } from '../../actions/userAction'
import {userAvatar} from '../../selectors/postAvatar'

class PostsList extends React.Component{
    state = {
        items: 3,
        hasMoreItems: true
    }
    
    componentDidMount() {
        this.props.dispatch(startGetPosts())
        this.props.dispatch(startGetAllUsers())
    }
    loadMore() {
        if(this.state.items===200){
          
          this.setState({ hasMoreItems: false});
        }else{
            setTimeout(() => {
            this.setState({ items: this.state.items + 20});
        }, 2000);
        }
        
      }
    // handleLoad = () => {
    //     this.setState((prevState) => {
    //         return {
    //             count : prevState.count+2
    //         }
    //     })
    // }

    render(){
        return(
            <div className="container-fluid" >
                <h2 style={{textAlign:"center"}}>Blogs by our Travellers</h2>
                {/* <InfiniteScroll
                    dataLength={this.props.posts.length}
                    // next={this.props.dispatch(startGetPosts())}
                    // hasMore={true}
                    loadMore={this.loadMore.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={<h4>Loading...</h4>}
                    > */}
                {
                    this.props.posts.reverse().map((post) => 
                    {
                        let avatars = userAvatar(this.props.allUsers, post.userId)

                        return(
                            <div className="row">
                            <div className="col-md-2"></div>
                            
                            <div className="card mb-3 shadow-lg p-3 mb-5 mt-3 bg-white rounded" style={{width:900}}>
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
                                <span> 
                                    <h6> {avatars?.username} </h6> 
                                </span>
                                
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
                    // this.state.count < this.props.posts?.length && (<button onClick={this.handleLoad} className="btn btn-primary btn-lg">load more</button>)
                    
                }
                
                {/* </InfiniteScroll> */}
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