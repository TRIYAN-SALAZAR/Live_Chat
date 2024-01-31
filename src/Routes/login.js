const { Router } = require('express');
const router = Router();

const { logIn } = require('../Controller/login_signin')

router.post('/', logIn);

module.exports = router;