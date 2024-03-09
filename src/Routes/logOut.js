const { Router } = require("express");
const router = Router();

const { logOut } = require("../Controller/logOut");

router.route("/").get(logOut);

module.exports = router;
