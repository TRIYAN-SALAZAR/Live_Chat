const control = {}

control.logIn = async (req, res) => {
    
    const { username, password } = req.body;
    if (!username || !password) throw new Error('All fields are required');

    try {
        
        res.json({ message: 'Login Successful' })
    }
    catch (err) {
        return res.status(400).json({message: err})
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