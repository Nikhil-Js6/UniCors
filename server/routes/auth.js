const router = require('express').Router();

const verify = require('../middlewares/verifyToken');

const { register, 
        login, 
        verifyUser, 
        verifyAdmin, 
        forgotPassword, 
        profileUpdate 
    } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/verify-user', verify, verifyUser);
router.post('/forgot-password', forgotPassword );
router.put('/profile-update', profileUpdate );

// Admin: 
router.get('/verify-admin', verify, verifyAdmin);

module.exports = router;
