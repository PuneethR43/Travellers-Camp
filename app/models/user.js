const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type : String,
        required : [ true, 'User name cannot be empty' ],
        unique : true
    },
    email : {
        type : String,
        required : [ true, 'E-mail required' ],
        validate : {
            validator : function(value){
                            return isEmail(value)
            },
            message : function(){
                return 'invalid e-mail format'
            }
        },
        unique : true
    },
    password : {
        type : String,
        minlength : 6,
        maxlength : 15,
        required : [ true, 'password needs to be between 6 - 15 characters' ]
    },
    about : {
        type : String
    },
    profile : {
        type : String
    }
})

userSchema.pre('save', function(next){
    bcryptjs.genSalt()
        .then((salt) => {
            bcryptjs.hash(this.password, salt)
                .then((encryptedPassword) => {
                    this.password = encryptedPassword
                    next()
                })
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User