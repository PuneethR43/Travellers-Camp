const express = require('express')
const router = express.Router()

const uploads = require('../app/middlewares/imageUploads')

const { authenticateUser } = require('../app/middlewares/authentication')

const usersController = require('../app/controllers/usersController')
const postsController = require('../app/controllers/postsController')
const commentsController = require('../app/controllers/commentsController')
// const upload = require('../app/middlewares/imageUploads')

router.post('/api/user/register',uploads.single('profile'), usersController.register)
router.post('/api/user/login', usersController.login)

//private route
router.get('/api/user/account', authenticateUser, usersController.account) // user account info
router.get('/api/users', authenticateUser, usersController.list) // all users
router.put('/api/user/update/', authenticateUser, usersController.update) // update user details
router.delete('/api/user/logout', authenticateUser, usersController.logout) // logout

//posts
router.get('/api/posts', authenticateUser, postsController.list) // all posts
router.get('/api/posts/my', authenticateUser, postsController.myPosts) // my posts
router.get('/api/post/:id', authenticateUser, postsController.show) // post based on ID
router.get('/api/posts/user/:userId', authenticateUser, postsController.userPosts) // other user posts
router.post('/api/post/create', authenticateUser, uploads.single('image'),postsController.create) // create post
router.put('/api/post/:id', authenticateUser, postsController.update) // edit post
router.delete('/api/post/:id', authenticateUser, postsController.destroy) // delete post

//comments
router.get('/api/comments', authenticateUser, commentsController.list)
router.post('/api/comment/:id', authenticateUser, commentsController.create)
router.delete('/api/comment/:id', authenticateUser, commentsController.destroy)

module.exports = router