const control = {};

control.logOut = async (req, res) => {
  try {
    req.session.destroy();
    req.sessionStore.destroy(req.sessionID);
    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = control;
