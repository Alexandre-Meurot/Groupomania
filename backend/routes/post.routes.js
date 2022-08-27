const express = require('express');
const router = express.Router();

// IMPORTS CONTROLLERS
const postCtrl = require('../controllers/post.controller');
const likeCtrl = require('../controllers/like.controller');

// IMPORTS MIDDLEWARE
const auth = require('../middleware/auth.middleware');
const authAdmin = require('../middleware/authAdmin.middleware')
const multer = require('../middleware/multer-config');

// ROUTES
router.post('', auth, multer, postCtrl.createPost);
router.get('', auth, postCtrl.getAllPosts);
router.put('/:postId', auth, multer, postCtrl.updatePost);
router.delete('/:postId', auth, postCtrl.deletePost);

router.delete('/admin/delete/:postId', authAdmin, multer, postCtrl.adminDeletePost)

router.post('/:postId/like', auth, likeCtrl.likePost);
router.get('/:postId/like', auth, likeCtrl.getAllLikes);

module.exports = router;
