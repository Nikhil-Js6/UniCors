const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');

class AuthController {

    async register (req, res) {

        const { name, email, password, secret, answer: secret_key } = req.body;

        User.findOne({email}).exec((err, user) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    error: 'Error saving the user!'
                })
            }
            if (user) {
                return res.status(400).json({
                    error: 'Email is already Taken',
                })
            }

            if(!secret || !secret_key) {
                return res.status(400).json({
                    error: 'Please pick a question',
                })
            }
        
            const hashed_password = bcrypt.hashSync(password, 12);
            const userId = uniqid();
        
            const newUser = new User({ name, email, hashed_password, userId, secret, secret_key });

            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({
                        error: 'Error finding the user!'
                    })
                }
                return res.status(201).json({
                    user,
                    message: 'Registration Success. Please login'
                })
            })
        })
    }

    async login (req, res) {

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.json({
                    error: 'User doesn\'t exist!'
                });
            }

            const validPassword = bcrypt.compareSync(password, user.hashed_password);
            if (!validPassword) { 
                return res.json({
                    error: 'Incorrect Password!'
                });
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            const { hashed_password, secret, secret_key, ...userInfo } = user._doc;

            return res.status(200).json({
                message: 'Logged in successfully!',
                userInfo,
                token
            });
        } 
        catch (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Server error. Try again!'
            });
        }
    }

    async verifyUser (req, res) {

        const userId = req.user._id;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ verified: false });
            }
            return res.status(200).json({ verified: true });
        }
        catch (err) {
            return res.status(500).json({
                error: 'Can\'t verify user!',
                verified: false
            });
        }
    }
    
    async verifyAdmin (req, res) {

        const userId = req.user._id;
        
        try {
            const user = await User.findById(userId);
            if (user.role === 'admin') {
                return res.status(200).json({ verified: true });
            }
            return res.status(400).json({ verified: false });
        }
        catch (err) {
            return res.status(500).json({
                error: 'Can\'t verify user!',
                verified: false
            });
        }
    }

    async forgotPassword (req, res) {

        const { email, newPassword, secret, answer: secret_key } = req.body;

        if (!email) {
            return res.status(400).json({
                error: 'Enter your email'
            })
        }

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({
                error: 'Enter new password'
            })
        }

        if (!secret || !secret_key) {
            return res.status(400).json({
                error: 'Please pick a question and answer',
            })
        }

        const user = await User.findOne({ email, secret });

        if (!user) {
            return res.status(400).json({
                error: 'Can\'t find the user, Choose correct details',
            })
        }

        try {
            const hashed_password = bcrypt.hashSync(newPassword, 12);
            await User.findByIdAndUpdate(
                user._id, 
                { hashed_password }, 
                { new: true }
            );

            return res.status(200).json({
                message: 'Password reset success. Login with new password.'
            })
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                error: 'Error saving the user!'
            })
        } 
    }
    
    async updateProfile (req, res) {

        let user = req.body;

        if (req.body.password) {
            user.hashed_password = bcrypt.hashSync(user.password, 12);
        }
        
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id, 
                user,
                { new: true }
            )
                .select('-hashed_password -secret -secret_key');

            return res.status(200).json({ 
                message: 'Profile Updated Successfully!',
                updatedUser
            });
        } 
        catch (err) {
            console.log(err);
            if (err.code === 11000) {
                return res.status(400).json({
                    error: 'Username is already taken!'
                });
            }
            return res.status(400).json({
                error: 'Error updating the profile!'
            });
        }
    }
}

module.exports = new AuthController();
