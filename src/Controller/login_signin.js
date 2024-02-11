const bcrypt = require('bcrypt');
const UserNoSQL = require('../Schemas/noSQL/user');
const UserSQL = require('../Schemas/SQL/user');
const idgenerate = require('../Services/idGenerate');
const error = require('../errorsMessage');

const control = {}

control.signIn = async (req, res) => {
    try {
        const {
            username,
            password,
            first_name,
            last_name
        } = req.body;
        if (!username || !password || !first_name || !last_name) throw new Error(error.require.allFields);

        const usenamerExists = await UserSQL.findOne({ where: { username: username } });
        if (usenamerExists) throw new Error(error.usernameExists);

        const id = await idgenerate();
        const passwordHash = await bcrypt.hash(password, 8);
        const newUser = await UserSQL.create({
            id: id,
            username: username,
            password: passwordHash,
            first_name: first_name,
            last_name: last_name
        });
        if (!newUser) throw new Error(error.ServerError);

        const newUseDB = await UserNoSQL.create({userID: id, username: username});
        if (!newUseDB) throw new Error(error.ServerError);

        return res.status(201).json({ message: 'signin Successful' })
    }
    catch (err) {
        if (err.message === error.ServerError) return res.status(500).json({ message: error.ServerError });
        if (err.name === error.conectToDB) return res.status(500).json({ message: error.ServerError });
        return res.status(400).json({ message: err.message })
    }
}

control.logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).send(error.require.allFields);

        const user = await UserSQL.findOne({ where: { username: username } });
        if (!user) return res.status(400).send('User not found');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(402).json({ message: error.wrongPassword });

        req.session.regenerate(function (err) {
            if (err) next(err);

            req.session.data = {
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            };

            req.session.save(function (err) {
                if (err) next(err);

                console.log('----------------------------------------------------')
                console.log('sessionID: ', req.sessionID);
                console.log('session: ', req.session.data);
                console.log('----------------------------------------------------')

                return res.redirect('/chats');
            });
        });
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = control