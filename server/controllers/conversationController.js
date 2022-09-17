const Conversation = require('../models/Conversation');

class ConversationController {

    async createConversation (req, res) {

        const { senderId, recieverId } = req.body;

        try {
            const previousConversation = await Conversation.findOne({
                members: [senderId, recieverId]
            });
            
            if (previousConversation) {
                return res.status(200).json(previousConversation); 
            }

            const newConversation = new Conversation({
                members: [senderId, recieverId]
            });

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
            const conversations = await Conversation.find({
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
