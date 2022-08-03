const router = require('express').Router();

const verify = require('../middlewares/verifyToken');

const { getUser,
        findPeople, 
        addFollower, 
        addUserFollowing, 
        userFollowings, 
        userFollowers, 
        removeFollower, 
        removeUserFollowing, 
        removeFollowing, 
        removeUserFollower,
        searchUser,
        getFollowers,
        getFollowings } = require('../controllers/userController');

router.post('/get-user', verify, getUser );

router.get('/find-people', verify, findPeople );
router.put('/follow-user', verify, addFollower, addUserFollowing );

router.get('/user-followings', verify, userFollowings );
router.put('/unfollow-user', verify, removeFollower, removeUserFollowing );

router.get('/user-followers', verify, userFollowers );
router.put('/remove-follower', verify, removeFollowing, removeUserFollower );

router.get('/search-user/:query', searchUser );

router.post('/get-followers', getFollowers );
router.post('/get-followings', getFollowings );

module.exports = router;
