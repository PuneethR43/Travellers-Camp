const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema=new Schema({
    body : {
        type:String
    },
    postId : {
        type:Schema.Types.ObjectId , 
        ref:"Post"
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
      
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment