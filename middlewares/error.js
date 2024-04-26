module.exports = (err, req, res, next) => {
  return res.status(500).send(`Something Failed!!!! ${err}`);
  // console.log(err);
};
