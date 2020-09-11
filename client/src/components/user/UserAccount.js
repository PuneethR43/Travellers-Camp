import React from 'react'
import {connect} from 'react-redux'

class UserAccount extends React.Component{

    render(){
       // console.log("user account", this.props.users.email)
        return(
            <div>
                <h1>User Account </h1>
                <h2>ID : {this.props.user._id} </h2>
                <h2>User Name : {this.props.user.username} </h2>
                <h2>Email : {this.props.user.email} </h2>
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