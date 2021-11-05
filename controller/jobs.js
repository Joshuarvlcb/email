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

const getAllJobs = (req, res) => {
  res.send("hi");
};
const getJob = (req, res) => {
  res.send("hi");
};

const createJob = (req, res) => {
  res.send("hi");
};

const updateJob = (req, res) => {
  res.send("hi");
};

const deleteJob = (req, res) => {
  res.send("hi");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
