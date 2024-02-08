const { Router } = require('express');
const router = Router();

const { signIn } = require('../Controller/login_signin')

router.post('/', signIn);

module.exports = router;