const control = {}

control.logIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).send('All fields are required')
        }

        
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = control