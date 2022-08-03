const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    hashed_password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    about: {

    },
    secret: {
        type: String,
        required: true
    },
    secret_key: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    followings: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
},

    { timestamps: true }

);

module.exports = new mongoose.model("User", userSchema);
