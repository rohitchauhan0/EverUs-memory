const express = require('express');
const { createPost, getPosts } = require('../controllers/posts');
const authMiddleware = require('../middleware/middleware');

const router = express.Router();

router.post('/posts', authMiddleware, (req, res, next) => createPost(req, res, next));
router.get('/get-posts', (req, res, next) => getPosts(req, res, next));

module.exports = router;