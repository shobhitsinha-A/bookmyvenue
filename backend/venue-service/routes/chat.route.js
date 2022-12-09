const express = require('express');
const router = express.Router();

const chatController = require('../controller/chat.controller');

//chat routes
router.post('/', chatController.createChat);

router.get('/:from_user', chatController.getChatUsers);

router.get('/:from_user/:to_user', chatController.getChats);

router.put('/status', chatController.updateChatStatus);

module.exports = router;