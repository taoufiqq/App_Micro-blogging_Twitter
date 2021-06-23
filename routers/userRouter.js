const express = require('express');
const {getOneUser, updateOneUser, getAllUser} = require('./../controllers/userController')
const {userById} = require('./../middelwares/user')
const {requireSignIn, isAuth, isUser} = require('./../middelwares/auth')


const router = express.Router();

router.get('/:userId', [requireSignIn, isAuth, isUser], getOneUser);
router.put('/:userId', [requireSignIn, isAuth, isUser], updateOneUser);
router.get('/:userId', [requireSignIn, isAuth, isUser], getAllUser);


router.param("userId", userById);

module.exports = router;