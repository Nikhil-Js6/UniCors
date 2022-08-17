const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    conversationId: {
        type: mongoose.Schema.ObjectId,
        ref: "Conversation",
        required: true,
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: {},
        required: true,
    }
}, 

    { timestamps: true },

);

module.exports = new mongoose.model('Message', messageSchema);