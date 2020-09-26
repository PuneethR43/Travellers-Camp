import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetAllUsers } from '../../actions/userAction'

class UserList extends React.Component {
    componentDidMount(){
        this.props.dispatch(startGetAllUsers())
    }
    render(){
        // console.log("users list", this.props.allUsers)
        return(
            <div className="card text-center">
                <div className="card-header"> Our Wanderers </div>
                    {
                        this.props.allUsers.map((users) => {
                            return (
                            <div className="card-body">
                             <h5 className="card-title">{users.username}</h5> 
                            <p className="card-text">{users.about}</p>
                            <Link to = {`/user/posts/${users._id}`} className="btn btn-primary"> View Posts </Link>
                               
                            </div>

                            )
                        })
                    }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        allUsers : state.allUsers.filter(user => user._id != state.users._id ),
    }
}
export default connect(mapStateToProps)(UserList)