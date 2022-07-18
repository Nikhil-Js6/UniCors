const router = require('express').Router();

const verify = require('../middlewares/verifyToken');

const { findPeople, addFollower, userFollowing } = require('../controllers/userController');

router.get('/find-people', verify, findPeople);
router.put('/follow-user', verify, addFollower, userFollowing );

module.exports = router;