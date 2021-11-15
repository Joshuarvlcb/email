/*
getAllJobs function
Grabs every job from the DB
Returns a json with jobs and the job count

getJob
Grabs a single 
Uses the jobID or the createdBy ID to find one
Returns the job in a json

createJob
Creates a job using the Job model from the body
Returns a status CREATED and the job created as a json

updateJob 
Takes in a jobID and the params and will update an existing job on the DB
Returns status OK and the job updated as a json

deleteJob
Finds a job based on jobID and removes it from the DB
Returns status OK and sends the ID that was removed back

*/
const Job = require("../models/job-schema");
const { StatusCodes } = require("http-status-codes");
const { notFound } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const { userID } = req.user;
  const { id: jobID } = req.params;

  const job = await Job.findOne({
    _id: jobID,
    createdBy: userID,
  });
  if (!job) {
    throw new notFound("no job id");
  }
  res.status(StatusCodes.OK).json({ job });

  res.send("hi");
};

const createJob = async (req, res) => {
  // getting id
  req.body.createdBy = req.user.userID;
  // getting company and position
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    job,
  });
};

const updateJob = async (req, res) => {
  console.log("userID");

  const { company, position } = req.body;
  const { userID } = req.user;
  const { id: jobID } = req.params;
  if (!company || !position) {
    throw new notFound("company and position must be filled");
  }
  const job = await Job.findByIdAndUpdate(
    {
      _id: jobID,
      createdBy: userID,
    },
    req.body,
    //job will be saving the new document not the old one
    //!!also run validators
    { new: true, runValidators: true }
  );

  if (!job) throw new notFound(`no job with id ${jobID}`);
  res.status(StatusCodes.OK).json({ job: job });
};

const deleteJob = async (req, res) => {
  const { userID } = req.user;
  const { id: jobID } = req.params;
  const job = await Job.findByIdAndRemove({
    _id: jobID,
    createdby: userID,
  });
  if (!job) {
    throw new notFound("no job with id");
  }
  res.status(StatusCodes.OK).json({ job: job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
