const colors = require('colors');
const { parse } = require('cookie');

function socketDev(socket, app) {
    console.log(colors.cyan('User Dev connected'));

    socket.on('show-data', () => {
        console.log(socket.request.session);
        console.log(socket.data)
    });
    
    socket.on('disconnect', () => {
        console.log(colors.cyan('User disconnected'));
        socket.disconnect();
    });
}

module.exports = socketDev;