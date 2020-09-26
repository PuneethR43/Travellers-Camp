import axios from 'axios'
import swal from 'sweetalert'
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
            const post = response.data
            if(post.hasOwnProperty('error')){
                alert(post.error)
            }else{
                dispatch(setPost(post))
                swal("successfully posted!", "Go ahead and post more!", "success")
                // alert('successfully posted')
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
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/api/post/${postID}`, {
                headers : {
                    'Authorization' : localStorage.getItem('Authorization')
                }
            } )
            .then((response) => {
                const deletedPost = response.data
                dispatch(removePost(deletedPost))
            })
            .catch((err) => alert(err))
        
            swal(" Your file has been deleted!", {
                icon: "success",

              })
            } else {
              swal("Your Post file is safe!");
            }
          })
}}

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
                swal("Good Job!", "successfully updated!", "success")
                // alert('successfully updated')
                redirect()
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const setComments = (comments) => {
    return { type : 'SET_COMMENTS', payload : comments }
}

export const startCreateComment = (id, formData) => {
    return(dispatch) => {
        axios.post(`http://localhost:5000/api/comment/${id}`, formData, {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            const comments = response.data
            dispatch(setComments(comments))
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
            dispatch(getComments(comments))
        })
        .catch((err) => {
            console.log(err)
        })
        }
    }

    export const removeComment = (id) => {
        return { type : 'DELETE_COMMENT', payload : id }
    }

    export const startRemoveComment = (id) => {
        return(dispatch) => {
            axios.delete(`http://localhost:5000/api/comment/${id}`, {
                headers : {
                    'Authorization' : localStorage.getItem('Authorization')
                }
            })
            .then((response) => {
                const deletedComment = response.data
                dispatch(removeComment(deletedComment))
            })
            .catch((err) => {
                alert(err)
            })
        }
    }
