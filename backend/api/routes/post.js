const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth.js');
const PostsController = require('../controllers/post.js');
const CommentsController = require('../controllers/comment.js');

// Create a post
router.post('/create', PostsController.createPost);

// Get all posts
router.get('/all', PostsController.getAllPost);

// Get post details by id
router.get('/:postId', PostsController.getPostById);

// Create a comment details
router.post('/comment/:postId', CommentsController.createComment);

// Get all comments for post id
router.get('/comment/:postId', CommentsController.getCommentByPostId);

// Update a post
// router.patch('/:postId', PostsController.postUpdate);

// Delete user details
// router.delete('/:postId', PostsController.postDelete);

module.exports = router;