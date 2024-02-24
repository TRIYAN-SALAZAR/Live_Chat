function isValidAuth(socket, next) {
    if (socket.handshake.headers.authorization === '1234') {
        console.log('valid auth');
        next();
    } else {
        next(new Error('invalid auth'));
    }
}

module.exports = isValidAuth;