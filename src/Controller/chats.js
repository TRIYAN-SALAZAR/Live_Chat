const control = {};

control.getChats = async (req, res) => {
    console.log('----------------------------------------------------');
    console.log('sesion: ', req.session.data);
    res.json({ message: 'Get Chats Successful' });
}

module.exports = control