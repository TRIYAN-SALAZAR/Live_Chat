const Chat = require('../Schemas/chat');
const Message = require('../Schemas/messages');
const User = require('../Schemas/user');
const control = {};

const errors = {
    require: 'Participants are required',
    atLeastTwo: 'At least two or more participants are required',
    notFound: 'Chat not found',
    notCreated: 'Chat not created'
}

control.getChats = async (req, res) => {
    // console.log('----------------------------------------------------');
    // console.log('sesion: ', req.session.data);
    // res.json({ message: 'Get Chats Successful' });

    try {
        const allChats = await Chat.find();
        if (allChats.length === 0) throw new Error('No chats found');

        console.log(allChats)
        return res.status(200).json({ message: 'Get Chats Successful', allChats: allChats });

    } catch (err) {
        return res.json({ message: err.message })
    }
}

control.connectChat = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.findOne({ _id: id });

        if (!chat) throw new Error('Chat not found');
        else {
            return res.status(200).json({ message: 'Chat found', chat: chat });
        }
    } catch (error) {
        return res.json({ message: error.message });
    }
}

control.createChatOrRoom = async (req, res) => {

    try {
        const { participants, isRoom } = req.body;
        
        if (!participants) throw new Error(errors.require);
        if (participants.length < 2) throw new Error(errors.atLeastTwo);

        const messagesCreated = await Message.create({ messages: [] });
        const chatCreated = isRoom !== undefined
            ? await Chat.create({ participants: participants, isRoom: isRoom, refMessage: messagesCreated._id })
            : await Chat.create({ participants: participants, refMessage: messagesCreated._id });

        if (!chatCreated) throw new Error(errors.notCreated);
        return res.status(200).json({ message: 'Chat created'});

    } catch (error) {
        if (error.message === errors.require || error.message === errors.atLeastTwo) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
}

module.exports = control;