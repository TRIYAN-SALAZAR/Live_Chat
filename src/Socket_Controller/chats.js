const colors = require('colors');

async function connectChat(socket) {
    console.log(colors.cyan('User connected to chat'));

    socket.on('message', (message) => {
        socket.emit('message', 'Hello user from Socket.io');
    });
}

module.exports = connectChat;