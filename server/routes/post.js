const router = require('express').Router();
const formidable = require('express-formidable');

const verify = require('../middlewares/verifyToken');

const { createPost, 
        uploadImage, 
        userPosts, 
        userFeed, 
        likePost, 
        unlikePost, 
        addComment, 
        removeComment } = require('../controllers/postController');

router.post('/create-post', verify, createPost);
router.post('/upload-image', verify, formidable({ maxFileSize: 5 * 1024 * 1024 }), uploadImage);

router.post('/user-posts', userPosts);
router.get('/user-feed', verify, userFeed);

router.put('/like-post', verify, likePost);
router.put('/unlike-post', verify, unlikePost);

router.put('/add-comment', verify, addComment);
router.put('/remove-comment', verify, removeComment);

module.exports = router;
