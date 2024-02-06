const { isObjectIdOrHexString } = require('mongoose');
const chat = require('../Schemas/chat');
const control = {};

control.getChats = async (req, res) => {
    // console.log('----------------------------------------------------');
    // console.log('sesion: ', req.session.data);
    // res.json({ message: 'Get Chats Successful' });

    try {
        const allChats = await chat.find({});
        if (!allChats) throw new Error ('No chats found');

        return res.status(200).json({ message: 'Get Chats Successful', allChats: allChats });

    } catch (err) {
        return res.json({ message: err.message })
    }
}

control.connectChat = async (req, res) => {
    try {
        const { id } = req.params;  
        const chat = await chat.findOne({ _id: id });

        if (!chat) throw new Error('Chat not found');
        else {
            return res.status(200).json({ message: 'Chat found', chat: chat });
        }
    } catch (error) {
        
    }
}

module.exports = control;