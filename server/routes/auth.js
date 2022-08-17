const router = require('express').Router();

const verify = require('../middlewares/verifyToken');

const { register, 
        login, 
        verifyUser, 
        verifyAdmin, 
        forgotPassword, 
        updateProfile
    } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/verify-user', verify, verifyUser);
router.post('/forgot-password', forgotPassword );
router.put('/update-profile', updateProfile );

// Admin: 
router.get('/verify-admin', verify, verifyAdmin);

module.exports = router;
