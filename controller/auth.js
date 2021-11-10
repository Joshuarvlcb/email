const env = require("dotenv");
const AuthError = require("../errors/unath-error");
const jwt = require("jsonwebtoken");
const User = require("../models/user-schema");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  // const { username, password, email } = req.body;
  // console.log(password);

  // //salt is a  random bit combination that is included in the hash;
  // //salt is added in the hask so the verifier can check even with randomness
  // const salt = await bcrypt.genSalt(10);
  // const hashpass = await bcrypt.hash(password, salt);

  // console.log(hashpass);
  const user = await User.create(req.body);
  /*
    encrypting is storing your data behind a firewall

    hashing which scrambles yout data into a string of uniform size
  
  */
  // const { username, password, email } = req.body;
  console.log("testing");

  // const id = new Date().getDate();
  // const token = jwt.sign({ id, username }, "password", {
  //   expiresIn: "20d",
  // });
  // console.log(userSchema);
  const token = user.createJWT();

  res.status(200).json({
    user: {
      name: user.username,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("please provide email and password");
  }

  const userLogin = await User.findOne({ email });
  if (!userLogin) {
    throw new AuthError("invalid credentials");
  }
  const isPasswordCorrect = await userLogin.comparePasswords(password);

  if (!isPasswordCorrect) {
    throw new AuthError("invalid credentials");
  }
  const token = userLogin.createJWT();
  res.status(200).json({
    user: {
      name: userLogin.username,
    },
    token,
  });
};

module.exports = {
  login,
  register,
};
