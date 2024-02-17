const bcrypt = require('bcrypt');
const UserNoSQL = require('../Schemas/noSQL/user');
const UserSQL = require('../Schemas/SQL/user');
const idgenerate = require('../Services/idGenerate');
const error = require('../errorsMessage');
const errorByUser = require('../Services/errorByUser');
const colors = require('colors');
const control = {}

control.signIn = async (req, res) => {
    try {
        const {
            username,
            password,
            first_name,
            last_name
        } = req.body;
        if (!username || !password || !first_name || !last_name) errorByUser(res, { err: error.require.allFields });

        const usenamerExists = await UserSQL.findOne({ where: { username: username } });
        if (usenamerExists) errorByUser(res, { err: error.usernameExists });

        const id = idgenerate();
        const passwordHash = await bcrypt.hash(password, 8);
        const newUser = await UserSQL.create({
            id: id,
            username: username,
            password: passwordHash,
            first_name: first_name,
            last_name: last_name
        });
        if (!newUser) throw new Error(error.ServerError);

        const newUseDB = await UserNoSQL.create({ userID: id, username: username });
        if (!newUseDB) throw new Error(error.ServerError);

        return res.status(201).json({ message: 'signin Successful' })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

control.logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) errorByUser(res, { err: error.require.allFields });

        const user = await UserSQL.findOne({ where: { username: username } });
        if (!user) errorByUser(res, { err: error.notFoundUser });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) errorByUser(res, { err: error.wrongPassword });
        console.log('sessionID: ', req.sessionID);

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
                console.log('sessionID: ', colors.green(req.sessionID));
                console.log('session: ', req.session);
                console.log('----------------------------------------------------')

                return res.redirect('/chats');
            });
        });
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = control