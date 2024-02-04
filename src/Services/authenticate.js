function isAuthenticated (req, res, next) {
    if(req.session.data) {
        console.log('paso por aqui: ', req.session.data.id, '||', req.session.data.username);
        next();
    }
    else {
        return res.redirect('/login');
    }
}

module.exports = isAuthenticated;