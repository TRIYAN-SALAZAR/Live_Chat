const colors = require('colors');

function socketDev(socket, app) {
    console.log(colors.cyan('User connected'));

    socket.use((___, next) => {
        socket.data = app.get('configSession').data;
        next();
    });

    socket.on('message', (message) => {
        socket.emit('message', message);
    });

    socket.on('show-data', () => {
        console.log(socket.data);
        socket.emit('show-data', socket.data);
    });

    socket.on('disconnect', () => {
        console.log(colors.cyan('User disconnected'));
    });
}

module.exports = socketDev;