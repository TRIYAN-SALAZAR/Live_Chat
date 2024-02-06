const { Router } = require('express');
const router = Router();

const { getChats, connectChat } = require('../Controller/chats');
const isAuthenticated = require('../Services/authenticate');

router.route('/')
    .get(isAuthenticated, getChats)

router.route('/:id')
    .get(isAuthenticated, connectChat)

module.exports = router;