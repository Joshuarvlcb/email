const AuthError = require("../errors/unath-error");

const register = (req, res) => {
  /*
  Creates a new User from the body 
Creates a new token from the user
Responds with username and token

  save username and passwaord and token to 
  the database
  send res with username and token

  */
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
