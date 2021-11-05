const CustomError = require("./CustomError");

class NotFound extends CustomError {
  constructor(msg) {
    super(msg);
  }
}

module.exports = NotFound;
