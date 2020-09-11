import axios from 'axios'

export const startRegisterUser = (formData, redirect) => {
    return(dispatch) => {
       // console.log('user action',formData)
       axios.post('http://localhost:5000/api/user/register', formData)
            .then((response) => {
                //console.log(response.data)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors)
                }else{
                    alert('successfully registered')
                    redirect()
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    export const setUser = (user) => {
        return { type : 'SET_USER', payload : user }
    }

    export const startLoginUser = (formData, redirect) => {
        return(dispatch) => {
            axios.post('http://localhost:5000/api/user/login', formData)
                .then((response) => {
                   // console.log(response.data)
                    if(response.data.hasOwnProperty('errors')){
                        alert(response.data.errors)
                    }else{
                        alert('successfully logged in')
                        localStorage.setItem('Authorization', response.data.token)
                        axios.get('http://localhost:5000/api/user/account', {
                            headers : {
                            'Authorization' : localStorage.getItem('Authorization')
                        }
                    })
                    .then((response) => {
                        const user = response.data
                        dispatch(setUser(user))
                        redirect()
                    })
                    .catch((err) => {
                        alert(err)
                    })  
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    export const startGetUser = () => {
        return(dispatch) => {
            axios.get('http://localhost:5000/api/user/account', {
                headers : {
                    'Authorization' : localStorage.getItem('Authorization')
                }
            })
            .then((response) => {
                const user = response.data
                dispatch(setUser(user))
            })
            .catch((err) => {
                alert(err)
            })
        }
    }



    export const startLogoutUser = () => {
        return(dispatch) => {
            axios.delete('http://localhost:5000/api/user/logout', {
                headers : {
                    'Authorization' : localStorage.getItem('Authorization')
                }
            })
            .then((response) => {
                if(response.data.message){
                    localStorage.removeItem('Authorization')
                    alert(response.data.message)
                    dispatch(setUser({}))
                    window.location.href = "/"
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    }

    export const setAllUsers = (users) => {
        return { type : 'SET_ALL_USERS', payload : users }
    }
    
    export const startGetAllUser = () => {
        return(dispatch) => {
            axios.get('http://localhost:5000/api/users', {
                headers : {
                    'Authorization' : localStorage.getItem('Authorization')
                }
            })
            .then((response) => {
                const users = response.data
                // console.log("get all users", users)
                dispatch(setAllUsers(users))
            })
            .catch((err) => {
                alert(err)
            })
        }
    }