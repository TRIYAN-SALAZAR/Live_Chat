const error = require("../messagesWarnings/errorsMessage");
const { isValidToken } = require("../Services/JWT");
async function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader === null || authHeader === undefined)
      return res.status(401).json({ err: error.jwt.tokenNotFound });
    if (req.session.data === undefined)
      return res.status(401).json({ err: error.notAuthenticated });

    const isValid = isValidToken(authHeader, req.session.data.id);
    if (!isValid) return res.status(401).json({ err: error.notAuthenticated });

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: error.ServerError });
  }
}

function socketAuthenticate(socket, next) {
  try {
    const userID = socket.handshake.headers["userid"];
    const authHeader = socket.handshake.headers["authorization"];
    if (authHeader === undefined)
      return next(new Error(error.jwt.tokenNotFound));

    if (userID === undefined) return next(new Error(error.jwt.idNotFound));

    const isValid = isValidToken(authHeader, userID);
    if (!isValid) return next(new Error(error.notAuthenticated));

    socket.data = isValid;

    next();
  } catch (err) {
    console.log(err);
    next(new Error(error.ServerError));
  }
}

module.exports = { isAuthenticated, socketAuthenticate };
