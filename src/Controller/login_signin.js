const bcrypt = require("bcrypt");
const UserNoSQL = require("../Schemas/noSQL/user");
const UserSQL = require("../Schemas/SQL/user");
const idgenerate = require("../Services/idGenerate");
const error = require("../messagesWarnings/errorsMessage");
const { generateToken } = require("../Services/JWT");

const control = {};

control.signIn = async (req, res) => {
  try {
    const { username, password, first_name, last_name } = req.body;
    if (!username || !password || !first_name || !last_name)
      return res.status(400).json({ ermessager: error.require.allFields });

    const usenamerExists = await UserSQL.findOne({ where: { username: username } });
    if (usenamerExists)
      return res.status(400).json({ message: error.usernameExists });

    const id = idgenerate();
    const passwordHash = await bcrypt.hash(password, 8);
    const newUser = await UserSQL.create({
      id: id,
      username: username,
      password: passwordHash,
      first_name: first_name,
      last_name: last_name,
    });
    if (!newUser) throw new Error(error.ServerError);

    const newUseDB = await UserNoSQL.create({ userID: id, username: username });
    if (!newUseDB) throw new Error(error.ServerError);

    return res.status(201).json({ message: "signin Successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

control.logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ err: error.require.allFields });

    const user = await UserSQL.findOne({ where: { username: username } });
    if (!user) return res.status(404).json({ err: error.notFoundUser });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ err: error.wrongPassword });
    req.session.regenerate(function (err) {
      if (err) next(err);

      req.session.data = {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      };

      req.session.save(function (err) {
        if (err) next(err);

        const token = generateToken(user.id);

        return res.status(200).header("Authorization", token).json({ message: "login Successful" })
      });
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

module.exports = control;
