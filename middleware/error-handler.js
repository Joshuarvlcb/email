const CustomError = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
     return res.status(400).json({msg:err.message})
  }
  next();
};

module.exports = errorHandler;
