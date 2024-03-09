const Chats = require("../Schemas/noSQL/chat");
const Messages = require("../Schemas/noSQL/messages");
function chats(socket, io) {
  const chat = socket.handshake.query.chat;
  if (chat) socket.join(chat);

  // socket.on('message', async (data) => {
  //     try {
  //         if (chat) {
  //             const referenceChat = await Chats.findOne({ _id: chat });
  //             await Messages.updateOne({ _id: referenceChat.refMessage }, { $push: { messages: data } });
  //         }

  //         socket.broadcast.to(chat).emit('message', data);
  //     }catch (err) {
  //         console.log(err);
  //         socket.emit('error', err);
  //     }
  // });

  socket.on("disconnect", () => {
    console.log(colors.red("User disconnected"));
  });
}

module.exports = chats;
