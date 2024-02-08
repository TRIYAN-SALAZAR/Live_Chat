const { Router } = require('express');
const router = Router();

const { getChats, connectChat, createChatOrRoom } = require('../Controller/chats');
const isAuthenticated = require('../Services/authenticate');

router.route('/')
    .get(isAuthenticated, getChats)

router.route('/:id')
    .post(isAuthenticated, createChatOrRoom)
    .get(isAuthenticated, connectChat)

module.exports = router;