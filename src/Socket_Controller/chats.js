const colors = require('colors');

function connectChat(socket) {
    console.log(colors.cyan('User connected'));

    socket.on('message', (...data) => {
        socket.broadcast.emit('message', data[0]);
    });

    socket.on('disconnect', () => {
        console.log(colors.red('User disconnected'));
    });   
}

module.exports = connectChat;