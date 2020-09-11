const initialValue = []

const usersReducer = (state = initialValue, action) => {
    switch(action.type){
        case 'SET_ALL_USERS' : {
            // console.log("all user reducer", action.payload)
            return [].concat(action.payload)
        }
        default : {
            return [].concat(state)
        }
    }
}

export default usersReducer