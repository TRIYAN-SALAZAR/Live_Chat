const jwt = require("jsonwebtoken");
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

const isValidToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = {generateToken, isValidToken}