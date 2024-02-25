function isValidAuth(socket, next) {
    /* implementar JWT y posible uso de passport */
    if (socket.handshake.headers.authorization === '1234') {
        socket.data = {
            socketID: socket.id,
            username: socket.handshake.headers.username,
            userID: socket.handshake.headers.userid
        }
        next();
    } else {
        next(new Error('invalid auth'));
    }
}

module.exports = isValidAuth;