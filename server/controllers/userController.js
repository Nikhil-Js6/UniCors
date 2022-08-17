const User = require('../models/User');

class UserController {

    async getUser (req, res) {
        try {
            const user = await User.findById(req.body._id)
               .select('-hashed_password -secret -secret_key');
            return res.status(200).json(user);
        } 
        catch (err) {
            console.log(err);
        }
    }

    async findPeople (req, res) {
        try {
            const user = await User.findById(req.user._id);
            let followings = user.followings;
            followings.push(user._id);

            const people = await User.find({ _id: { $nin: followings }})
            .select('-hashed_password -secret -secret_key').limit(6);
            
     //****OR ****/
            // const people = await User.find({ _id: { $nin: followings }}).limit(6);
            // const trimmed = people.map((person) => {
            //     const { name, image, _id } = person._doc;
            //     return { name, image, _id };
            // })
            
            res.json(people);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Can\'t find people');
        }
    }

    async addFollower (req, res, next) {
        try {
            if (req.user._id === req.body._id) {
                return res.json({ 
                    error: 'Can\'t follow yourself!'
                });
            }
            await User.findByIdAndUpdate({ _id: req.body._id }, {
                $addToSet: { followers: req.user._id }
            });
            next();
        }
        catch (err) {
            console.log(err);
        }
    }

    async addUserFollowing (req, res) {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.user._id },
            {
                $addToSet: { followings: req.body._id }
            },
                { new: true }
            )
            .select('-hashed_password -secret -secret_key');

            return res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Can\'t follow!');
        }
    }
    
    async removeFollower (req, res, next) {
        try {
            await User.findByIdAndUpdate({ _id: req.body._id }, {
                $pull: { followers: req.user._id }
            });
            next();
        }
        catch (err) {
            console.log(err);
        }
    }

    async removeUserFollowing (req, res) {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.user._id },
            {
                $pull: { followings: req.body._id }
            },
                { new: true }
            )
            .select('-hashed_password -secret -secret_key');

            return res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Can\'t follow!');
        }
    }

    async userFollowings (req, res) {
        try {
            const user = await User.findById(req.user._id);
            const followings = await User.find({ _id: user.followings })
            .select('-email -hashed_password -secret -secret_key');

            return res.status(200).json(followings);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Can\'t find followings!');
        }
    }

    async userFollowers (req, res) {
        try {
            const user = await User.findById(req.user._id);
            const followers = await User.find({ _id: user.followers })
            .select('-email -hashed_password -secret -secret_key');

            return res.status(200).json(followers);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Can\'t find followings!');
        }
    }

    async removeFollowing (req, res, next) {
        try {
            await User.findByIdAndUpdate({ _id: req.body._id }, {
                $pull: { followings: req.user._id }
            });
            next();
        } 
        catch (err) {
            console.log(err);
        }
    }

    async removeUserFollower (req, res) {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.user._id }, 
            {
                $pull: { followers: req.body._id }, 
            },
                { new: true }
            )
            .select('-hashed_password -secret -secret_key');

            return res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Can\'t remove!');
        }
    }

    async searchUser (req, res) {
        const { query } = req.params;
        if (!query) return;
        try {
            const user = await User.find({
                $or: [
                    { name: { $regex: query, $options: 'i' }},
                    { username: { $regex: query, $options: 'i' }},
                ]
            })
               .select('name image _id followers');
            res.status(200).json(user);
        } 
        catch (err) {
            console.log(err);
        }
    }

    async getFollowers (req, res) {
        try {
            const user = await User.findById(req.body._id);
            const followers = await User.find({ _id: user.followers })
               .select('-email -hashed_password -secret -secret_key');

            return res.status(200).json({ user: user.name, followers });
        } 
        catch (err) {
            console.log(err);
        }
    }

    async getFollowings (req, res) {
        try {
            const user = await User.findById(req.body._id);
            const followings = await User.find({ _id: user.followings })
               .select('-email -hashed_password -secret -secret_key');

            return res.status(200).json({ user: user.name, followings });
        } 
        catch (err) {
            console.log(err);
        }
    } 
}

module.exports = new UserController();
