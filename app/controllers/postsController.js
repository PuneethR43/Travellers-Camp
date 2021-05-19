const Post = require('../models/post')
// const renderHTML = require('react-render-html')
const postsController = {}

postsController.list = (req, res) => {
    // console.log(req.query)
    let skip = Number(req.query.skip) || 0
    let limit = Number(req.query.limit) || 5
    Post.find()
    .populate('comments')
    .skip(skip)
    .limit(limit)
        .then((posts) => {
            res.json(posts)
        })
        .catch((err) => {
            res.json(err)
        })
}

postsController.myPosts = (req, res) => {
    const userId = req.userId
    Post.find( { userId } )
        .then((posts) => {
            res.json(posts)
        })
        .catch((err) => {
            res.json(err)
        })
}

postsController.show = (req, res) => {
    const id = req.params.id 
    Post.findById(id)
        .then((post) => {
            res.json(post)
        })
        .catch((err) => {
            res.json(err)
        })
}

postsController.userPosts = (req, res) => {
    const userId = req.params.userId
    Post.find( {userId} )
        .then((posts) => {
            res.json(posts)
        })
        .catch((err) => {
            res.json(err)
        })
}

postsController.create = (req, res) => {
    const body = req.body
    const post = new Post(body)
    post.image = req.file.path
    post.userId = req.userId
    
    if(body.title == '' || body.body == ''){
        res.json({
            error : 'Fields cannot be empty'
        })
    }else{
        post.save()
        .then((post) => {
           res.json(post)
        })
        .catch((err) => {
            res.json(err)
        })
    }
    
}

postsController.update = (req, res) => {
    const postId = req.params.id
    const userId = req.userId
    const body = req.body

    Post.findOneAndUpdate( {_id : postId, userId}, body, {new : true, runValidators : true} )
        .then((post) => {
            if(post){
                res.json({post})
            } else {
                res.json({
                    err : "Post not found"
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

postsController.destroy = (req, res) => {
    const postId = req.params.id
    const userId = req.userId
    
    Post.findOneAndDelete( {_id : postId, userId} )
        .then((post) => {
            res.json(post)
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports = postsController