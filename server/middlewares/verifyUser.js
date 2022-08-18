const jwt = require('jsonwebtoken');
const User = require('../models/User');

function verify (req, res, next) {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) {
                return res.status(403).json({
                    message: 'Invalid Token!'
                });
            }
            req.user = data;
            next();
        });
    }
    else {
        return res.status(401).json({
            message: 'You are not Authenticated!'
        });
    }
}

const verifyUser = (req, res, next) => {
    verify(req, res, async () => {
        const userId = req.user._id;
        try {
            const user = await User.findById(userId);
            req.profile = user;
            next();
        }catch (err) {
            return res.status(500).json({
                message: 'Server Internal Error!'
            });
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verify(req, res, async () => {
        const userId = req.user._id;
        try {
            const user = await User.findById(userId);
            if (user.role !== 'admin') {
                return res.status(403).json({
                    message: 'Admin Access Denied!'
                });
            }
            req.profile = user;
            next();
        }catch (err) {
            return res.status(500).json({
                message: 'Server Internal Error!'
            });
        }
    });
}

module.exports = { verifyUser, verifyAdmin };