const Chat = require('../Schemas/noSQL/chat');
const Message = require('../Schemas/noSQL/messages');
const User = require('../Schemas/noSQL/user');
const error = require('../errorsMessage');
const control = {};

control.getChats = async (req, res) => {

    try {
        const { id } = req.session.data;
        const allChats = await Chat.find();
        if (allChats.length === 0) return res.status(201).json({ message: error.notFound });

        return res.status(200).json({ message: 'Get Chats Successful', allChats: allChats });

    } catch (err) {
        return res.json({ message: err.message })
    }
}

control.createChatOrRoom = async (req, res) => {

    try {
        const { participants, isRoom, chatName } = req.body;

        if (!participants) throw new Error(error.require.participants);
        if (participants.length < 2) throw new Error(error.require.atLeastTwo);

        const messagesCreated = await Message.create({ messages: [] });
        const chatCreated = isRoom !== undefined
            ? await Chat.create({ participants: participants, isRoom: isRoom, refMessage: messagesCreated._id, chatName: chatName })
            : await Chat.create({ participants: participants, refMessage: messagesCreated._id, chatName: chatName });
        await User.updateOne({ userID: req.session.data.id }, { $push: { chats: chatCreated._id } });

        if (!chatCreated) throw new Error(error.notCreated);

        return res.status(200).json({ message: 'Chat created' });

    } catch (err) {
        if (err.message === error.require.participants || err.message === error.require.atLeastTwo) {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: err.message });
    }
}

control.connectChat = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.findOne({ _id: id });

        if (!chat) throw new Error(error.notFound);
        else {
            return res.status(200).json({ message: 'Chat found', chat: chat });
        }
    } catch (err) {
        return res.json({ message: err.message });
    }
}

module.exports = control;