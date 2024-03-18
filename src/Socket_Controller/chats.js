const { v4: uuidv4 } = require("uuid");
const Chats = require("../Schemas/noSQL/chat");
const Messages = require("../Schemas/noSQL/messages");

async function chats(socket, io) {
  const roomOrChat = socket.handshake.query.chat;
  let referenceChat;
  if (roomOrChat !== undefined) {
    referenceChat = await Chats.findOne({ _id: roomOrChat });
    socket.join(roomOrChat);
  }

  socket.on("message", async (data) => {
    data.id = uuidv4();
    data.username = socket.data.username;
    const date = new Date();
    data.date = date.toLocaleString();

    if (roomOrChat) {
      await Messages.updateOne(
        { _id: referenceChat.refMessage },
        { $push: { messages: data } },
      );
    }
    io.of("/chat").to(roomOrChat).emit("message", data);
  });

  socket.on("edit-message", async (data) => {
    try {
      if (roomOrChat) {
        await Messages.updateOne(
          { _id: referenceChat.refMessage, "messages.id": data.id },
          { $set: { "messages.$.content": data.content } },
        );
      }

      io.of("/chat").to(roomOrChat).emit("edit-message", data);
    } catch (err) {
      console.log(err);
      socket.emit("error", "error to edit message");
    }
  });

  socket.on("delete-message", async (data) => {
    try {
      if (roomOrChat) {
        await Messages.updateOne(
          { _id: referenceChat.refMessage, "messages.id": data.id },
          { $pull: { messages: { id: data.id } } },
        );
      }

      io.of("/chat").to(roomOrChat).emit("delete-message", "Message deleted", true);
    } catch (err) {
      console.log(err);
      socket.emit("error", "error to delete message");
    }
  });

  socket.on("disconnect", () => {
    if (roomOrChat) socket.leave(roomOrChat);
    socket.emit("disconnected", "User disconnected");
  });
}

module.exports = chats;
