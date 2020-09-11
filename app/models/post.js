const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    image : {
        type : String
    },
    title : {
        type : String,
        required : [ true, 'Title cannot be empty' ],
        minlength : 3
    },
    body : {
        type : String,
        required : [ true, 'Body cannot be empty' ],
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