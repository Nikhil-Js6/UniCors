const Message = require('../models/Message');
const User = require('../models/User');

class MessageController {
     
    async createMessage (req, res) {

        const { conversationId, text } = req.body;

        try {
            const newMessage = new Message({
                sender: req.user._id,
                conversationId, text
            });

            const savedMessage = await newMessage.save();
            
            return res.status(201).json(savedMessage);
        } 
        catch (err) {
            console.log(err);
        }
    }

    async getMessages (req, res) {

        const conversationId = req.params.id;

        try {
            const messages = await Message.find({ conversationId })
               .populate('sender', 'name image _id')
               .sort({ createdAt: 1 });
            
            return res.status(200).json(messages);
        } 
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new MessageController();