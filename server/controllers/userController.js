const User = require('../models/User');

class UserController {

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
            const user = await User.findByIdAndUpdate({ _id: req.body._id }, {
                $addToSet : { followers: req.user._id }
            });
            next();
        }
        catch (err) {
            console.log(err);
        }
    }

    async userFollowing (req, res) {
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
}

module.exports = new UserController();
