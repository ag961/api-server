'use strict';

module.exports = (req, res, next) => {
  console.log({
    path: req.path,
    method: req.method
  });
  next();
}