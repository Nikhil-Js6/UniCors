const router = require('express').Router();

const verify = require('../middlewares/verifyToken');

const { createConversation, getConversations } = require('../controllers/conversationController');

router.post('/conversation', verify, createConversation);
router.get('/conversations/:id', verify, getConversations);

module.exports = router;