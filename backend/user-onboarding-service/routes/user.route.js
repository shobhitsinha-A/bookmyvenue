const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');

//register
router.post('/register', userController.registerUser);

//login
router.post('/login', userController.loginUser);

// get details
router.get('/profile/details/:user_name', userController.getUserDetails);

// update details
router.put('/profile/details', userController.updateUserDetails);

// forgot password
router.post('/forgotpassword', userController.forgotPassword);

// update status
router.put('/status', userController.updateUserStatus);

module.exports = router;
