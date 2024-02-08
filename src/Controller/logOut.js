const control = {};

control.logOut = async (req, res) => {
    try {
        req.session.destroy();
        return res.redirect('/');
    } catch (error) {
        return res.json({ message: error.message });
    }
}

module.exports = control