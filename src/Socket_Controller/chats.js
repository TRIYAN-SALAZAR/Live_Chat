const Chats = require("../Schemas/noSQL/chat");
const Messages = require("../Schemas/noSQL/messages");

function chats(socket, io) {
  const roomOrChat = socket.handshake.query.chat;
  if (roomOrChat) socket.join(roomOrChat);

  socket.on("message", async (data) => {
    try {
      io.to(roomOrChat).broadcast.emit("message", data);

      if (roomOrChat) {
        const referenceChat = await Chats.findOne({ _id: roomOrChat });
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

  socket.on("disconnect", () => {
    if (roomOrChat) socket.leave(roomOrChat);
    socket.emit("disconnected", "User disconnected");
  });
}

module.exports = chats;
