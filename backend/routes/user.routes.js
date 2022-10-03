const express = require('express');
const router = express.Router();

// IMPORTS CONTROLLERS
const userCtrl = require('../controllers/user.controller');

// IMPORTS MIDDLEWARE
const auth = require('../middleware/auth.middleware');
const multerProfil = require('../middleware/multer-profil');

// ROUTES
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/userlist', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, multerProfil, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;


