const commentsReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_COMMENTS' : {
            // console.log("set comment reducer", action.payload)
            return state.concat(action.payload)
        }
        case 'GET_COMMENTS' : {
            return [].concat(action.payload)
        }
        case 'DELETE_COMMENT' : {
            return state.map((comment) => {
                if(comment._id == action.payload._id){
                    return Object.assign( {}, comment, action.payload  )
                }else{
                    return Object.assign( {}, comment )
                }
            })
        }
        default : {
            return [].concat(state)
        }
    }
}

export default commentsReducer