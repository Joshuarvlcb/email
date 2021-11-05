const CustomError = require("./custom-error");

class AuthError extends CustomError {
  constructor(msg) {
    super(msg);
  }
}

module.exports = AuthError;
