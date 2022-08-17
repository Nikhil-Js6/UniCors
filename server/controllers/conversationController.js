const User = require('../models/User');
const Conversation = require('../models/Conversation');

class ConversationController {

    async createConversation (req, res) {

        const { senderId, recieverId } = req.body;

        try {
            const newConversation = new Conversation({
                members: [senderId, recieverId],
                // req.user._id
            },);

            const savedConversation = await newConversation.save();
            
            return res.status(201).json(savedConversation);
        }
        catch (err) {
            console.log(err);
        }
    }

    async getConversations (req, res) {

        const userId = req.params.id;

        try {
            let conversations = await Conversation.find({
                members: { $in : [userId] }
            })
               .sort({ createdAt: -1 });

            return res.status(200).json(conversations);
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new ConversationController();