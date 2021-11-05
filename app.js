//imports
//load env file
require("express-async-errors");
//create app
const express = require("express");
const app = express();
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
//use json middleware
app
  .use([express.urlencoded({ extended: false }), express.json()])
  .use(errorHandler)
  .use(notFound);
//error middleware
app.use("/api/v1", jobsRouter);
app.use("/api/v1", authRouter);

const start = async () => {
  try {
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
};
start();
//create route /send with get method to run sendEmail (controller)

//use your not found and errorHandler middlewares

//create port variable

//create app startup fuction

//run app start up function
