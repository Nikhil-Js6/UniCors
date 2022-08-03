const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    content: {
        type: {},
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    image: {
        url: String,
        public_id: String,
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
    comments: {
        text: String,
        created: { 
            type: Date, 
            default: Date.now 
        },
        postedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        }
    }
},

    { timestamps: true}
    
);

module.exports = new mongoose.model("Post", postSchema);
