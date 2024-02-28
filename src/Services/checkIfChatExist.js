const Chat = require('../Schemas/noSQL/chat');

async function existsChat(participants) {
    try {
        const userOne = participants[0];
        const userTwo = participants[1];

        const chat = await Chat.findOne({ participants: { $all: [userOne, userTwo] }, isRoom: false });

        return chat ? true : false;
    } catch (err) {
        console.log(err);
    }
}

module.exports = existsChat;