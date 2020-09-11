const initialValue = []

const commentsReducer = (state = initialValue, action) => {
    switch(action.type){
        case 'GET_COMMENTS' : {
            // console.log("all user reducer", action.payload)
            return [].concat(action.payload)
        }
        default : {
            return [].concat(state)
        }
    }
}

export default commentsReducer