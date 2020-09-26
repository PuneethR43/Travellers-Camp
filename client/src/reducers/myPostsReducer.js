const initialValue = []

const myPostsReducer = (state = initialValue, action) => {
    switch(action.type){
        case 'GET_MY_POSTS' : {
            return [].concat(action.payload)
        }
        case 'SET_POST' : {
            return state.concat(action.payload)
        }
        case 'DELETE_POST' : {
            // console.log(action.payload)
            return state.filter(post=> post._id!== action.payload._id)
        }
        case 'UPDATE_POST' : {
            // console.log('reducer', action.payload)
            return state.map((post) =>{
                if(post._id == action.payload._id){
                    return Object.assign( {}, post, action.payload )
                } else {
                    return Object.assign( {}, post )
                }
            })
        }
        
        default : {
            return [...state]
        }
    }
}

export default myPostsReducer