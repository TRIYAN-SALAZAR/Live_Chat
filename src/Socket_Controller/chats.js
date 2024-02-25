const colors = require('colors');

function chats(socket, appWS) {
    const chat = socket.handshake.query.chat;

    socket.on('message', (...data) => {
            socket.broadcast.to(chat).emit('message', data);
    });

    socket.on('all-info-client', (data) => {
        console.log(socket.rooms);
    });

    socket.on('disconnect', () => {
        console.log(colors.red('User disconnected'));
    });
}

module.exports = chats;