const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "20s",
    subject: "auth",
    issuer: "backend service",
    audience: ["client", "web"],
    algorithm: "HS256"
  });
};

const isValidToken = (token, id) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET, {
      subject: "auth",
      issuer: "backend service",
      audience: ["client", "web"],
      algorithms: ["HS256"],
    });
    
    return decoded.id === id;
  } catch (err) {
    return false;
  }
};

module.exports = { generateToken, isValidToken };
