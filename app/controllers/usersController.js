const User = require('../models/user')
const usersController = {}

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

usersController.register = (req, res) => {
    const body = req.body
    const user = new User(body)

    User.find({ email: body.email })
        .then((value) => {
            if(value.length == 0){
                user.save()
                    .then((user) => {
                        res.json(user)
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            }else{
                res.json({ errors:"Email already exists" })
            }
        })
    }

usersController.login = (req, res) => {
    const body = req.body 
    // check if email is present 
    User.findOne({ email: body.email })
        .then((user) => {
            if(user) {
                bcryptjs.compare(body.password, user.password)
                    .then((result) => {
                        if(result) {
                            const tokenData = {
                                id: user._id
                            }
                            const token = jwt.sign(tokenData, 'secret123', { expiresIn: '2d'})
                            res.json({
                                token: token
                            })
                        } else {
                            res.json({ errors: ' invalid email/password ' })
                        }
                    })
                    .catch((err)=>err)
            } else {
                res.json({ errors: ' invalid email/password '})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

usersController.account = (req, res) => {

    User.findById(req.userId)
    .then((user) => {
        res.json(user)
    })
    .catch((err) => {
        res.json(err)
    })
}

usersController.list = (req, res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch((err) => {
            res.json(err)
        })
}

usersController.logout = (req, res) => {
    //const { user, token } = req
    const user = req.user
    const token = req.token
    User.findByIdAndUpdate(user, { $pull: { tokens: { token } } })
        .then(function () {
            res.json({ message : 'successfully logged out' })
        })
        .catch(function (err) {
            res.json(err)
        })
}

// usersController.logout = (req, res) => {
//     const token = req.token
//     const user = req.user

//     User.findByIdAndUpdate(user._id, { $pull : { tokens : { token } } })
//         .then(() => {
//             res.json({message : 'successfully logged out'})
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

/*usersController.destroy = (req, res) => {
    //const postId = req.params.id
    const userId = req.userId
    
    User.findOneAndDelete( {user : userId} )
        .then((user) => {
            if(user){
                res.json(user)
            } else {
                res.json({
                    err : "User you are trying to delete is not found."
                })
            }
        })
        .catch((err) => {
            res.json({
                err : "User you are trying to delete is not found."
            })
        })
}*/

module.exports = usersController