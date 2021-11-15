const express = require("express");
const router = express.Router();
const {
  getJob,
  getAllJobs,
  deleteJob,
  updateJob,
  createJob,
} = require("../controller/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).put(updateJob);

module.exports = router;
