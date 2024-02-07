function isAuthenticated (req, res, next) {
    if(req.session.data) {
        console.log('paso por aqui: ', req.session.data.id, '||', req.session.data.username);
        next();
    }
    else {
        return res.status(400).json({
            message: 'Unauthorized please sign in or Log In',
        });
    }
}

module.exports = isAuthenticated;