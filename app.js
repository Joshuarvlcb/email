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

//security libraries
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss");

//use json middleware
app
  //rate limiter just limits the amount of calls that an IP can make to your api
  .set("trsut proxy", 1)
  .use(
    rateLimiter({
      windowMs: 1000 * 60 * 15, //15min
      max: 100,
    })
  )
  .use([express.urlencoded({ extended: false }), express.json()])
  //general security blanket
  .use(helmet())
  //prevents cors errors
  .use(cors())
  //user sanitation this prevents SOME user based hacking
  .use(xss())
  .use("/api/v1/jobs", auth, jobsRouter)
  .use("/api/v1/auth", authRouter)
  //error middleware
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
