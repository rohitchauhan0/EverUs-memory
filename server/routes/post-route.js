const express = require('express');
const { createPost } = require('../controllers/posts');
const authMiddleware = require('../middleware/middleware');

const router = express.Router();

router.post('/posts', authMiddleware, (req, res, next) => createPost(req, res, next));

module.exports = router;