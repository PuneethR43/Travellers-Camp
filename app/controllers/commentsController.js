const Comment=require('../models/comment')
const Post =require('../models/post')
// const User = require('../models/user')
const commentsController={}

commentsController.create = async (req,res)=>{
    // console.log("req user",req.user)
    const id = req.params.id
    const post = await Post.findOne({_id:id})
        
    const body=req.body
    const comment=new Comment(body)
    comment.userId=req.userId
    comment.postId=post._id
  
    await comment.save()
     
    post.comments.push(comment._id)
           
    await post.save()
        .then((post)=>{
            res.json(post)
        })
        .catch((err) => res.json(err))

}


commentsController.list=(req,res)=>{
      Comment.find()
       .then((commt)=>{
           res.json(commt)
       })
       .catch((err)=>{
           res.json(err)
       })
     
}

// commentsController.destroy=(req,res)=>{
    
//     const id =req.params.id
//     // console.log("id",id)

//    Comment.findById({_id:id})
//     .then((cmt)=>{
//         Post.findById({_id:cmt.postId})
//           .then((post)=>{
//             post.comments.pull({_id:id})
              
//             post.save()
//               .then((post)=>{
//                 // res.json(art)
//               })
           
//           })
         
//     })
//  Comment.findByIdAndDelete({_id:id})
//         .then((cmnt)=>{
//             cmnt.save()
//               res.json(cmnt)
//         })

// }

module.exports=commentsController