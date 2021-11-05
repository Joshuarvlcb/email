const env = require("dotenv");
const AuthError = require("../errors/unath-error");
const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const { username, password } = req.body;
  /*
regex email
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)
    *@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

  Creates a new User from the body 
Creates a new token from the user
Responds with username and token

  save username and passwaord and token to 
  the database
  send res with username and token

  */

  const token = jwt.sign({ username, password }, env.process.JWT_SECRET, {
    expires: "20d",
  });
  console.log(toke);
  res.send("hi");
};

const login = (req, res) => {
  /*
    Takes the email and password from the body 
Finds the user from the DB 
Compares the passwords 
Creates a token if everything is ok 
Responds with username and token is all works out

    */
  const { username, password } = req.body;
  console.log(username, password);
};

module.exports = {
  login,
  register,
};
