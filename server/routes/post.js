const router = require('express').Router();
const formidable = require('express-formidable');

const verify = require('../middlewares/verifyToken');

const { createPost, uploadImage, userPosts } = require('../controllers/postController');

router.post('/create-post', verify, createPost);
router.post('/upload-image', verify, formidable({ maxFileSize: 5 * 1024 * 1024 }), uploadImage);
router.get('/user-posts', verify, userPosts);

module.exports = router;