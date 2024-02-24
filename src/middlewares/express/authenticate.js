const error = require('../../messagesWarnings/errorsMessage');

async function isAuthenticated(req, res, next) {
    try {

        if (req.session.data.id) {
            console.log('paso por aqui: ', req.session.data.id, '||', req.session.data.username);
            next();
        }
    } catch (err) {
        if (err.message === error.cannotReadID) {
            return res.status(401).json({
                message: error.notAuthenticated
            });
        }
        return res.status(500).json({
            message: err.message,
            error: error.ServerError
        });
    }
}

module.exports = isAuthenticated;