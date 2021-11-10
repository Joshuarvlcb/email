//imports
//load env file
require("dotenv").config();
require("express-async-errors");
//create app
const express = require("express");
const app = express();
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
const auth = require("./middleware/auth");
//use json middleware
app
  .use([express.urlencoded({ extended: false }), express.json()])
  //error middleware
  .use("/api/v1/jobs", auth, jobsRouter)
  .use("/api/v1/auth", authRouter)
  .use(errorHandler)
  .use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(3000, () => {
      console.log(`listening @ ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
