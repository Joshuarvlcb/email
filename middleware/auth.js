require("dotenv").config();
const jwt = require("jsonwebtoken");
const { unauthError } = require("../errors");

const authError = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new unauthError("Not Authorized to access this part of the site");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, name: payload.name };
    next();
  } catch (err) {
    throw new unauthError("Authorization invalid");
  }
};

module.exports = authError;
