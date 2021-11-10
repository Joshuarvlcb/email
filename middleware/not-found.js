const notFound = (err, res) => {
  res.status(404).json({ msg: err.msg });
};

module.exports = notFound;
