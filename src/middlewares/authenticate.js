const error = require("../messagesWarnings/errorsMessage");
const { isValidToken } = require("../Services/JWT");
async function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader === null || authHeader === undefined)
      return res.status(401).json({ err: error.jwt.notFound });

    const isValid = isValidToken(authHeader, req.session.data.id);
    if (isValid instanceof Error) throw new Error(isValid.message);

    if (!isValid || req.session.data === undefined)
      return res.status(401).json({ err: error.notAuthenticated });

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: error.ServerError });
  }
}

module.exports = isAuthenticated;
