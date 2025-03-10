const express = require('express');
const { SIGN_IN, LOGIN } = require('../controllers/auth');

const router = express.Router();

router.post('/signin', (req, res, next) => SIGN_IN(req, res, next));
router.post('/login', (req, res, next) => LOGIN(req, res, next));

module.exports = router;
