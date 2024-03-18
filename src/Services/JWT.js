const jwt = require("jsonwebtoken");

/**
 * Generates a token for the given id.
 *
 * @param {string} id - The id for which the token is generated
 * @param {string} username - The username for which the token is generated
 * @return {string} The generated token
 */
function generateToken(id, username) {
  return jwt.sign(
    { data: { id: id, username: username } },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "15d",
      subject: "auth",
      issuer: "backend service",
      audience: ["client", "web"],
      algorithm: "HS256",
    },
  );
}

/**
 * Checks if the given token is valid for the specified id.
 *
 * @param {string} token - The token to be verified
 * @param {string} id - The id to compare with the decoded token id
 * @return {Object | Error} Return object data if the token is valid for the given id, otherwise an Error object
 */
function isValidToken(token, id) {
  try {
    if (!token || id === undefined) return false;

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET, {
      subject: "auth",
      issuer: "backend service",
      audience: ["client", "web"],
      algorithms: ["HS256"],
    });

    return decoded.data.id === id ? decoded.data : false;
  } catch (err) {
    return err;
  }
}

module.exports = { generateToken, isValidToken };
