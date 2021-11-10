const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a name"],
    minLength: [3, "username has to be at least 3 characters"],
    maxLength: [50, "username cant be more than 50 characters"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],

    minLength: [6, "password has to be at least 6 characters"],
  },
  email: {
    type: String,
    required: [true, "please provide a email"],

    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    unique: [true, "email already exist"],
  },
  //next is how we pass our request to next middlware function
}).pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  next();
});

userSchema.methods.comparePasswords = async function (submittedPassword) {
  const isMatch = await bcrypt.compare(submittedPassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = mongoose.model("User", userSchema);
