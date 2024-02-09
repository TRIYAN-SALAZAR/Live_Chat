const User = require('../Schemas/SQL/user');

async function isAuthenticated(req, res, next) {
    try {

        if (req.session.data.id) {
            console.log('paso por aqui: ', req.session.data.id, '||', req.session.data.username);
            next();
        }
        else {
            return res.status(400).json({
                message: 'Unauthorized please sign in or Log In',
            });
        }
    } catch (error) {
        return res.status(400 || 500).json({
            message: 'Unauthorized please sign in or Log In',
            error: error
        });
    }
}

module.exports = isAuthenticated;