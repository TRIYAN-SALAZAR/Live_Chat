const bcrypt = require('bcrypt');

const User = require('../Schemas/user');
const idgenerate = require('../Services/idGenerate');
const control = {}

control.logIn = async (req, res) => {
    try {
        const { 
            username, 
            password, 
            first_name, 
            last_name 
        } = req.body;

        if (!username || !password || !first_name || !last_name) throw new Error('All fields are required');
        
        const usenamerExists = await User.findOne({ where: { username: username } });
        if (usenamerExists) throw new Error('Username is already in use');

        const id = await idgenerate();
        const passwordHash = await bcrypt.hash(password, 8);
        const newUser = await User.create({
            id: id,
            username: username,
            password: passwordHash,
            first_name: first_name,
            last_name: last_name
        });

        if(!newUser) throw new Error('Server error');

        return res.status(201).json({ message: 'login Successful'})
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

control.signin = async (req, res) => {
    try {

        const { username, password } = req.body;
        if (!username || !password) return res.status(400).send('All fields are required');

        const user = await User.findOne({ where: { username: username } });
        if (!user) return res.status(400).send('User not found');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(402).json({ message: 'Incorrect password' });

        return res.json({ message: 'Signin Successful' })
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = control