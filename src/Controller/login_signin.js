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
        const newUser = await User.create({
            id: id,
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name
        });

        if(!newUser) throw new Error('Server error');

        return res.status(201).json({ message: 'login Successful'})
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err })
    }
}

control.signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).send('All fields are required')
        }

        res.json({ message: 'Signin Successful' })
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = control