const { Router } = require('express');
const router = Router();

const { logIn } = require('../Controller/log In');

router.post('/', logIn);