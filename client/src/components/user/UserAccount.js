import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { BiRightArrow } from "react-icons/bi"
import { startGetUser } from '../../actions/userAction'

class UserAccount extends React.Component{

    componentDidMount(){
        this.props.dispatch(startGetUser())
    }

    render(){
        return(
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-3" ></div>
                <div className="card text-center " style={{width: "20rem", marginTop:"50px"}}>
                    <img src={`http://localhost:5000/${this.props.user.profile}`} className="img-circle" alt="User Account" width="320" height = "250"></img>
                    <div className="card-body">
                        <h5 className="card-title">User Name : {this.props.user.username} </h5>
                        <h5 className="card-title">Email : {this.props.user.email} </h5>
                        <p className="card-text"> {this.props.user.about}.</p>
                        <div className='buttons'>
						<Link to="/myPosts" className='btn btn-primary'>
							My Posts <BiRightArrow/>
						</Link>
					    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.users
    }
}

export default connect(mapStateToProps)(UserAccount)