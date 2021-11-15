const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong try again later",
  };
  //this handles any validation errors
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(", ");
    customError.statusCode = 400;
  }
  //this handles duplication
  if (err.code && err.code === 11000) {
    customError.msg = `entered user ${Object.keys(
      err.keyValue
    )} already exists: ${Object.values(
      err.keyValue
    )} please enter a new ${Object.keys(err.keyValue)}`;
    customError.statusCode = 400;
  }
  //this handles type cast id has a fixed length
  if (err.name == "CastError") {
    customError.msg = `no item found woth id: ${err.value}`;
    customError.statusCode = 400;
  }
  return res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};

module.exports = errorHandler;
