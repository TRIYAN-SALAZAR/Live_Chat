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
      io.to(roomOrChat).broadcast.emit("message", data);

      if (roomOrChat) {
        await Messages.updateOne(
          { _id: referenceChat.refMessage },
          { $push: { messages: data } },
        );
      }
    } catch (err) {
      console.log(err);
      socket.emit("error", "error to send message");
    }
  });

  socket.on("edit-message", async (data) => {
    try {
      io.to(roomOrChat).broadcast.emit("edit-message", data);

      if (roomOrChat) {
        await Messages.updateOne(
          { _id: referenceChat.refMessage },
          { $set: { messages: data } },
        );
      }
    } catch (err) {
      console.log(err);
      socket.emit("error", "error to edit message");
    }
  });

  socket.on("delete-message", async (data) => {
    try {
      io.to(roomOrChat).broadcast.emit("delete-message", data);

      if (roomOrChat) {
        await Messages.updateOne(
          { _id: referenceChat.refMessage },
          { $pull: { messages: data } },
        );
      }
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
