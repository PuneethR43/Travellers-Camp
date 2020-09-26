export const userAvatar = (allUser, postUserId ) => {
    // this.props.allUsers.find((user)=>{
    // return user._id == post.userId
    let profile = allUser.find((user)=>{
        return user._id == postUserId
    })
    return profile
}