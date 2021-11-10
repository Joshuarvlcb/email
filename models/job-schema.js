const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      maxLength: [50, "company name cant be more than 50 characters"],
    },
    position: {
      type: String,
      maxLength: [100, "position name cant be more than 100 characters"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["interview", "declined", "pending"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Job", jobSchema);
