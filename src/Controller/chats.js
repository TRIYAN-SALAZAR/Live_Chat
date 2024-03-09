const Chat = require("../Schemas/noSQL/chat");
const Message = require("../Schemas/noSQL/messages");
const User = require("../Schemas/noSQL/user");
const existsChat = require("../Services/checkIfChatExist");
const error = require("../messagesWarnings/errorsMessage");
const control = {};

control.getChats = async (req, res) => {
  try {
    const { id } = req.session.data;
    const referenceChats = await User.find({ userID: id });
    const allChats = await Chat.find({ _id: { $in: referenceChats[0].chats } });
    if (allChats.length === 0)
      return res.status(201).json({ message: error.notFound });

    return res
      .status(200)
      .json({ message: "Get Chats Successful", allChats: allChats });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

control.createChatOrRoom = async (req, res) => {
  try {
    const { participants, isRoom, chatName } = req.body;
    if (participants.length < 2)
      return res.status(400).json({ err: error.require.atLeastTwo });
    if (!isRoom) {
      const exists = await existsChat(participants);
      if (exists) return res.status(400).json({ err: error.alreadyExists });
    }

    const messagesCreated = await Message.create();
    const chatCreated = await Chat.create({
      participants: participants,
      isRoom: isRoom || false,
      refMessage: messagesCreated._id,
      chatName: chatName,
    });

    if (!chatCreated) throw new Error(error.notCreated);
    await User.updateOne(
      { userID: req.session.data.id },
      { $push: { chats: chatCreated._id } },
    );

    return res.status(200).json({ message: "Chat created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = control;
