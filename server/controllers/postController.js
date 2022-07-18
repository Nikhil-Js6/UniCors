const Post = require('../models/Post');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

class PostController {

    async createPost (req, res) {
        
        const { content, image } = req.body;

        if(!content.length) {
            return res.status(400).json({
                error: 'Content is required!'
            });
        }
        try {
            console.log(req.user._id);
            const newPost = new Post({ content, image, postedBy: req.user._id });
            newPost.save();
            console.log(newPost);
            return res.status(201).json({
                message: 'Post Created Successfully!',
                newPost
            });
        } 
        catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'Can\'t create post!'
            });
        }
    }

    async uploadImage (req, res) {
        try {
            const result = await cloudinary.uploader.upload(req.files.image.path);
            console.log(result);
            return res.status(200).json({
                url: result.secure_url,
                public_id: result.public_id
            });
        } 
        catch (err) {
            console.log(err);
            return res.status(500).json('Something went wrong!');
        }
    }

    async userPosts (req, res) {
        try {
            const posts = await Post.find({ postedBy: req.user._id })
               .populate("postedBy", "name, _id, image")
               .sort({ createdAt: -1 })
               .limit(10);
            return res.status(200).json(posts);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Something went wrong!');
        }
    }

    async userFeed (req, res) {
        try {
            const user = await User.findById(req.user._id);
            let followings = user.followings;
            followings.push(user._id);

            const posts = await Post.find({ postedBy: { $in : followings } })
               .populate("postedBy", "name, image, _id")
               .sort({ createdAt: -1 })
               .limit(10);
            return res.status(200).json(posts);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Something went wrong!');
        }
    }
}

module.exports = new PostController();
