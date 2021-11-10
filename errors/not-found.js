const CustomError = require("./custom-error");

class NotFound extends CustomError {
  constructor(msg) {
    super(msg);
  }
}

module.exports = NotFound;
