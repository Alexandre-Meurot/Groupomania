const express = require('express');
const router = express.Router();

// IMPORTS CONTROLLERS
const commentCtrl = require('../controllers/comment.controller')

// IMPORTS MIDDLEWARE
const auth = require('../middleware/auth.middleware');

// ROUTES
router.post('/:postId', auth, commentCtrl.createComment);
router.get('/:postId', auth, commentCtrl.getAllComments);
router.delete('/:commentId', auth, commentCtrl.deleteComments);

module.exports = router;