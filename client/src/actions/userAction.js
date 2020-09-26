import axios from 'axios'
import swal from 'sweetalert'

export const startRegisterUser = (formData, redirect) => {
    return(dispatch) => {
       // console.log('user action',formData)
       axios.post('http://localhost:5000/api/user/register', formData)
            .then((response) => {
                //console.log(response.data)
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors)
                }else{
                    swal({
                        title: "Registered Successfully!",
                        text: "You Registered!",
                        icon: "success",
                        button: "Aww yiss!",
                      });
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
                        // alert(response.data.errors)
                        swal("Invalid Credentials!", "Try again!");
                    }else{
                        swal("Good job!", "successfully logged in!", "success")
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
                        // alert(err)
                        swal({
                            title: "Ivalid Credentials",
                            text: "You Registered!",
                            icon: "danger",
                            button: "Aww yiss!",
                          });
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
                    swal("You Logged out","Come back agin!", "success")
                    // alert(response.data.message)
                    dispatch(setUser({}))
                    window.location.href = "/"
            }
        })
            .catch((err) => {
                // alert(err)
            })
        }
    }

    export const getAllUsers = (users) => {
        return { type : 'GET_ALL_USERS', payload : users }
    }
    
    export const startGetAllUsers = () => {
        return(dispatch) => {
            axios.get('http://localhost:5000/api/users', {
                headers : {
                    'Authorization' : localStorage.getItem('Authorization')
                }
            })
            .then((response) => {
                const users = response.data
                // console.log("get all users", users)
                dispatch(getAllUsers(users))
            })
            .catch((err) => {
                alert(err)
            })
        }
    }

    export const updateUser = (user) => {
        return { type : 'EDIT_USER', payload: user }
    }

    export const startUpdateUser = (formData, redirect) => {
        return(dispatch) => {
           console.log('user action',formData)
           axios.put(`http://localhost:5000/api/user/update` , formData, {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        })
                .then((response) => {
                   
                    console.log(response.data)
                    if(response.data.hasOwnProperty('errors')){
                        alert(response.data.errors)
                    }else{
                        const user = response.data
                        swal("Good Job!","Updated Successfully!", "success")
                        // alert('successfully updated')
                        dispatch(updateUser(user))
                        redirect()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }