const router = require('express').Router();

const verify = require('../middlewares/verifyToken');

const { createMessage, getMessages } = require('../controllers/messageController');

router.post('/send-message', verify, createMessage);
router.get('/message/:id', verify, getMessages);

module.exports = router;