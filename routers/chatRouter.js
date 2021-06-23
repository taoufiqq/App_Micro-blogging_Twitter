const express = require("express");
const {getChatById, createChat, getAllChat} = require("./../controllers/chatController")
const {requireSignIn, isAuth, isUser} = require("./../middelwares/auth")
const {userById} = require("./../middelwares/user")
const router = express.Router();


router.get('/', getAllChat)
router.post('/create/:userId', [requireSignIn, isAuth, isUser], createChat)


router.param('chatId', getChatById)
router.param('userId', userById)

module.exports = router