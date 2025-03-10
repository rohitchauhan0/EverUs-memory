const express = require('express');
const { SIGN_IN } = require('../controllers/auth');

const router = express.Router();

router.post('/signin', (req, res, next) => SIGN_IN(req, res, next));

module.exports = router;
