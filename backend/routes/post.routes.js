const express = require('express');
const router = express.Router();

// IMPORTS CONTROLLERS
const postCtrl = require('../controllers/post.controller');
const likeCtrl = require('../controllers/like.controller');

// IMPORTS MIDDLEWARE
const auth = require('../middleware/auth.middleware');
const checkAuth = require('../middleware/checkAuth.middleware');
const multer = require('../middleware/multer-config');

// ROUTES POST
router.post('', auth, multer, postCtrl.createPost);
router.get('', auth, postCtrl.getAllPosts);
router.put('/:postId', auth, multer, postCtrl.updatePost);
router.delete('/:postId', auth, postCtrl.deletePost);

// ROUTES LIKE POST
router.post('/:postId/like', auth, likeCtrl.likePost);
router.get('/:postId/like', checkAuth, likeCtrl.getAllLikes);

module.exports = router;
