const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    
    title : {
        type : String,
        required : [ true, 'Title cannot be empty' ],
        minlength : 3
    },
    description : {
        type : String,
        required : [ true, 'Title cannot be empty' ],
    },
    body : {
        type : String,
        required : [ true, 'Body cannot be empty' ],
    },
    image : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    comments : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post