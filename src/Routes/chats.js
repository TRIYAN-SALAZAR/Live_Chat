const { Router } = require('express')
const router = Router();

const { getChats } = require('../Controller/chats')

router.get('/chat/:id', getChats);

module.exports = router;