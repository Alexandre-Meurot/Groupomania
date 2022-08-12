const express = require('express');
const router = express.Router();

// IMPORTS CONTROLLERS
const userCtrl = require('../controllers/user.controller');

// IMPORTS MIDDLEWARE
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer-config');

// ROUTES
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;


