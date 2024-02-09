const control = {};

control.logOut = async (req, res) => {
    try {
        console.log('paso por aqui: ', req.session.data.id, '||', req.session.data.username);

        req.session.destroy();
        return res.redirect('/signin');
    } catch (error) {
        return res.json({ message: error.message });
    }
}

module.exports = control