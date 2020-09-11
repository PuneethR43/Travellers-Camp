import axios from 'axios'

export const getPosts = (posts) => {
    return { type : 'GET_POSTS', payload : posts }
}

export const startGetPosts = () => {
    return(dispatch) => {
        axios.get('http://localhost:5000/api/posts', {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            const posts = response.data
            dispatch(getPosts(posts))
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const getMyPosts = (posts) => {
    return { type : 'GET_MY_POSTS', payload : posts }
}

export const startGetMyPosts = () => {
    return(dispatch) => {
        axios.get('http://localhost:5000/api/posts/my', {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            const posts = response.data
            dispatch(getMyPosts(posts))
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const setPost = (post) => {
    return{ type : 'SET_POST', payload : post }
}

export const startCreatePost = (formData, redirect) => {
    return(dispatch) => {
        axios.post('http://localhost:5000/api/post/create', formData, {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            // const post = response.data
            // console.log(response.data)
            // if(response.data.hasOwnProperty('errors')){
            //     console.log(response.data.errors)
               
            // }
            const post = response.data
            if(post.hasOwnProperty('errors')){
                console.log(post.errors)
            }else{
                dispatch(setPost(post))
                alert('successfully posted')
                redirect()
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const removePost = (deletedPost) => {
    return { type : 'DELETE_POST', payload : deletedPost }
}

export const startRemovePost = (postID) => {
    return(dispatch) => {
        const confirm = window.confirm("Are You Sure?")
        if(confirm){
            axios.delete(`http://localhost:5000/api/post/${postID}`, {
                headers : {
                    'Authorization' : localStorage.getItem('Authorization')
                }
            } )
            .then((response) => {
                const deletedPost = response.data
                console.log(deletedPost)
                dispatch(removePost(deletedPost))
            })
            .catch((err) => alert(err))
        }
    }
}

export const setUpdatedPost= (updatedPost) => {
    return { type : 'UPDATE_POST', payload : updatedPost }
}

export const startEditPost = (formData, postID, redirect) => {
    return(dispatch) => {
        axios.put(`http://localhost:5000/api/post/${postID}`,formData, {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            
        const updatedPost = response.data
            if(updatedPost.hasOwnProperty('errors')){
                alert(updatedPost.errors)
            }else{
                dispatch(setUpdatedPost(updatedPost))
                alert('successfully updated')
                redirect()
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const startCreateComment = (id, formData) => {
    return(dispatch) => {
        axios.post(`http://localhost:5000/api/comment/${id}`, formData, {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
        }
    }

export const getComments = (comments) => {
    return { type : 'GET_COMMENTS', payload : comments }
}

export const startGetComments = () => {
    return(dispatch) => {
        axios.get(`http://localhost:5000/api/comments`, {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            const comments = response.data
            console.log("all comments",response.data)
            dispatch(getComments(comments))
        })
        .catch((err) => {
            console.log(err)
        })
        }
    }