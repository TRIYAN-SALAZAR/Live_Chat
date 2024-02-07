const { Router } = require('express');
const router = Router();

const { getChats, connectChat, createChatOrRoom } = require('../Controller/chats');
const isAuthenticated = require('../Services/authenticate');

// router.route('/')
//     .get(isAuthenticated, getChats)

// router.route('/:id')
//     .post(isAuthenticated, createChat)
//     .get(isAuthenticated, connectChat)

router.route('/')
    .get(getChats)

router.route('/:id')
    .post(createChatOrRoom)
    .get(connectChat)



module.exports = router;