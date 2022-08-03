const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

class PostController {

    async createPost (req, res) {
        
        const { content, image } = req.body;

        const user = await User.findById(req.user._id);

        if(!content.length) {
            return res.status(400).json({
                error: 'Content is required!'
            });
        }
        try {
            const newPost = new Post({ content, image, postedBy: user._id, username: user.name });
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
            const posts = await Post.find({ postedBy: req.body._id })
               .populate('postedBy', 'name image _id')
               .populate('comments.postedBy', 'name image _id')
               .sort({ createdAt: -1 })
               .limit(50);
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
               .populate('postedBy', 'name image _id')
               .populate('comments.postedBy', 'name image _id')
               .sort({ createdAt: -1 })
               .limit(50);
            return res.status(200).json(posts);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json('Something went wrong!');
        }
    }

    async likePost (req, res) {
        try {
            const post = await Post.findByIdAndUpdate({ _id: req.body._id }, 
            {
                $addToSet : { likes: req.user._id }
            },
                { new: true }
            );
            return res.status(200).json(post);
        } 
        catch (err) {
            console.log(err);
        }
    }
    
    async unlikePost (req, res) {
        try {
            const post = await Post.findByIdAndUpdate({ _id: req.body._id }, 
            {
                $pull : { likes: req.user._id }
            },
                { new: true }
            );
            return res.status(200).json(post);
        } 
        catch (err) {
            console.log(err);
        }
    }

    async addComment (req, res) {
        try {
            const text = req.body.comment;
            const post = await Post.findByIdAndUpdate({ _id: req.body._id }, 
            {
                $push : { comments: { text, postedBy: req.user._id } }
            },
                { new: true }
            )
               .populate('postedBy', 'name image _id')
               .populate('comments.postedBy', 'name image _id')
               .sort({ created: -1 });
            return res.status(200).json(post);
        } 
        catch (err) {
            console.log(err);
        }
    }

    async removeComment (req, res) {
        try {
            const comment = req.body.comment;
            const post = await Post.findByIdAndUpdate({ _id: req.body._id }, 
            {
                $pull : { comments: { _id: comment._id } }
            },
                { new: true }
            )
               .sort({ created: -1 });
            return res.status(200).json(post);
        } 
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new PostController();
