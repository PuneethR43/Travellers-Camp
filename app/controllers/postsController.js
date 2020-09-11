const Post = require('../models/post')
const postsController = {}

postsController.list = (req, res) => {
    Post.find().populate('comments')
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
    Post.findById(id).populate('comments')
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
    
    post.save()
        .then((post) => {
            // if(post.hasOwnProperty("errors")){
            //     res.json(errors.message)
            // }else{
            //     res.json(post)
            // }
            res.json(post)
        })
        .catch((err) => {
            res.json(err)
        })

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
            // if(post){
            //     res.json(post)
            // } else {
            //     res.json({
            //         err : "Post you are trying to delete is not found."
            //     })
            // }
        })
        .catch((err) => {
            res.json(err)
            // res.json({
            //     err : "Post you are trying to delete is not found."
            // })
        })
}

/*postsController.comment = (req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
}*/

module.exports = postsController