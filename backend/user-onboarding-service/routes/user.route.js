const express = require('express');
const router = express.Router();


const userController = require('../controller/user.controller');

//register
router.post('/register', userController.registerUser);

//login
router.get('/login', userController.loginUser);

// get details
// router.get('/profile/details', tokenService.authenticateToken, userController.getUserDetails);



module.exports = router;

