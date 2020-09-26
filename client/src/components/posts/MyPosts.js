import React from 'react'
import {connect} from 'react-redux'
import {FaPencilAlt, FaTrash} from 'react-icons/fa'
import { startGetMyPosts , startRemovePost, startEditPost} from '../../actions/postsAction'
import renderHTML from 'react-render-html' 

class MyPosts extends React.Component{

    handleEdit = (id) => {
        const postID = id
       
        this.props.history.push(`/edit/post/${postID}`)
    }

    handleRemove = (id) => {
        const postID = id
        this.props.dispatch(startRemovePost(postID))
        // console.log("remove",postID)
    }

    componentDidMount(){
        
        this.props.dispatch(startGetMyPosts())
    }
    render(){
        console.log("My Posts", this.props.myPosts)
        return(
            <div className="container-fluid">
                
                    {
                        this.props.myPosts.map((posts) => {
                            return (
                                <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8 card shadow-lg">
                                    <img src={`http://localhost:5000/${posts?.image}`}  alt="" width = "870px" height = "400"></img>
                                    <div className="card-body" >
                                        <span className="card-title title">{renderHTML(posts.title)}</span>
                                        <p className="card-text">{posts.description}</p>
                                        <button onClick = {() =>this.handleEdit(posts._id)} className = "btn btn-outline-secondary"><FaPencilAlt/></button>
                                        <button onClick = {() =>this.handleRemove(posts._id)} className = "btn btn-outline-danger" ><FaTrash/></button>
                                    </div>
                                </div>
                                </div>
                            )
                        })
                    }
            </div>



/* <div class="row">
<div className="col-md-2"></div>
<div className="col-md-8 card">
    <img src={`http://localhost:5000/${this.props.myPosts?.image}`}  alt="" width = "600" height = "200"></img>
    <div className="card-body" >
        <span className="card-title ">{ renderHTML(this.props.myPosts?.title) }</span>
        <p className="card-text">{ renderHTML(this.props.myPosts?.description) }</p>
        
        <button onClick = {() =>this.handleEdit(this.props.myPosts?._id)}>Edit</button>
        <button onClick = {() =>this.handleRemove(this.props.myPosts?._id)}>Remove</button>
   </div>
</div>
</div> */
        )
    }
}

const mapStateToProps = (state) => {
    return{
        myPosts: state.myPosts
    }
}

export default connect(mapStateToProps)(MyPosts)