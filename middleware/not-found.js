const CustomError = require("../errors/custom-error");

const notFound = (err, res, req, next) => {
  if (err instanceof CustomError) {
    res.status(404).json({ msg: err.msg });
  }
  next();
};

module.exports = notFound;
