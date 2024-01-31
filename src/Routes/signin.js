const { Router } = require('express');
const router = Router();

const { signin } = require('../Controller/login_signin')

router.post('/', signin);

module.exports = router;