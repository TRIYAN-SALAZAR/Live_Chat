const { v4: uuidv4 } = require("uuid");
const Chats = require("../Schemas/noSQL/chat");
const Messages = require("../Schemas/noSQL/messages");

async function chats(socket, io) {
  const roomOrChat = socket.handshake.query.chat;
  let referenceChat;
  if (roomOrChat) {
    referenceChat = await Chats.findOne({ _id: roomOrChat });
    socket.join(roomOrChat);
  }

  socket.on("message", async (data) => {
    try {
      data.id = uuidv4();

      if (roomOrChat) {
        await Messages.updateOne(
          { _id: referenceChat.refMessage },
          { $push: { messages: data } },
        );
      }

      io.to(roomOrChat).emit("message", data);
    } catch (err) {
      console.log(err);
      socket.emit("error", "error to send message");
    }
  });

  socket.on("edit-message", async (data) => {
    try {
      if (roomOrChat) {
        await Messages.updateOne(
          { _id: referenceChat.refMessage, "messages.id": data.id },
          { $set: { "messages.$.content": data.content } },
        );
      }

      io.to(roomOrChat).broadcast.emit("edit-message", data);
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

      io.to(roomOrChat).broadcast.emit("delete-message", data);
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
