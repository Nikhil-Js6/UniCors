const router = require('express').Router();
const formidable = require('express-formidable');

const verify = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyUser');

const { createPost, 
        uploadImage, 
        getPost,
        deletePost,
        userFeed, 
        userPosts,
        likePost, 
        unlikePost, 
        addComment, 
        removeComment,
        allPosts } = require('../controllers/postController');

router.post('/create-post', verify, createPost);
router.post('/upload-image', verify, formidable({ maxFileSize: 5 * 1024 * 1024 }), uploadImage);

router.get('/post/:id', verify, getPost);
router.delete('/post/:id', verify, deletePost);

router.get('/user-feed', verify, userFeed);
router.post('/user-posts', userPosts);

router.put('/like-post', verify, likePost);
router.put('/unlike-post', verify, unlikePost);

router.put('/add-comment', verify, addComment);
router.put('/remove-comment', verify, removeComment);

router.get('/all-posts', allPosts);

//Admin:
router.delete('/admin/delete-post/:id', verifyAdmin, deletePost);

module.exports = router;
