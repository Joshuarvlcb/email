const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/auth");
const userAuthentication = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(userAuthentication, login);

module.exports = router;
