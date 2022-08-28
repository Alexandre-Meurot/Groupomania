const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin.middleware');

// IMPORTS CONTROLLERS
const commentCtrl = require('../controllers/comment.controller')

// IMPORTS MIDDLEWARE
const auth = require('../middleware/auth.middleware');

// ROUTES
router.post('/:postId', auth, commentCtrl.createComment);
router.get('/:postId', auth, commentCtrl.getAllComments);
router.delete('/:commentId', auth, commentCtrl.deleteComments);

// ROUTE ADMIN
router.delete('/admin/delete/:commentId', authAdmin, commentCtrl.adminDeleteComment);

module.exports = router;