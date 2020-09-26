const initialValue = {}

const usersReducer = (state = initialValue, action) => {
    switch(action.type){
        case 'SET_USER' : {
            return {...action.payload}
        }
        case 'EDIT_USER' : {
            // return {...action.payload}
            // return Object.assign( {},state, action.payload )
            
            let name = Object.assign( {}, action.payload  )
            return state = name
        }
        default : {
            return {...state}
        }
    }
}

export default usersReducer