const Chat = require("../Schemas/noSQL/chat");

/**
 * Check if a chat exists between two participants.
 *
 * @param {Array} participants - An array containing two participant IDs.
 * @return {Boolean} Returns true if a chat exists between the two participants, otherwise false.
 */
async function existsChat(participants) {
  try {
    const userOne = participants[0];
    const userTwo = participants[1];

    const chat = await Chat.findOne({
      participants: { $all: [userOne, userTwo] },
      isRoom: false,
    });

    return chat ? true : false;
  } catch (err) {
    console.log(err);
  }
}

module.exports = existsChat;
