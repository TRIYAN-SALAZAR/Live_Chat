const { Router } = require('express');
const router = Router();

const { getChats } = require('../Controller/chats');
const isAuthenticated = require('../Services/authenticate');

router.route('/')
    .get(isAuthenticated, getChats)

router.route('/:id')
    .get(isAuthenticated, getChats)

module.exports = router;