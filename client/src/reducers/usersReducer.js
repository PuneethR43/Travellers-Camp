const initialValue = {}

const usersReducer = (state = initialValue, action) => {
    switch(action.type){
        case 'SET_USER' : {
            return {...action.payload}
        }
        default : {
            return {...state}
        }
    }
}

export default usersReducer