const express = require('express');
const {singin, signup, signout} = require('./../controllers/authController')
const {requireSignIn, isAuth, isUser} = require('./../middelwares/auth')
const {userById} = require('./../middelwares/user')
const {userSignupValidator} = require('./../middelwares/userValidator')


const router = express.Router();

router.post('/signin', singin);
router.post('/signup', userSignupValidator, signup);
router.get('/signout', signout);

module.exports = router;