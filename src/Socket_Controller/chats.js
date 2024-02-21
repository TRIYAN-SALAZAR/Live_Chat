const colors = require('colors');

async function connectChat(socket) {
    console.log(colors.cyan('User connected to chat'));

    socket.on('message', (message) => {
        socket.emit('message', 'Hello user from Socket.io');
    });

    socket.on('all-info-client', () => {
        console.log(socket.data);
        console.log(socket.request.sessionID);
        console.log(socket.request.session);
        console.log(`The socket handShake: `, socket.handshake);
        
    })
}

module.exports = connectChat;