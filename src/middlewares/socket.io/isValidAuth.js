function isValidAuth(socket, next) {
    if (socket.handshake.headers.authorization === '1234') {
        socket.data = {
            id: socket.id,
            username: socket.handshake.headers.username,
            userID: socket.handshake.headers.userID
        }
        next();
    } else {
        next(new Error('invalid auth'));
    }
}

module.exports = isValidAuth;