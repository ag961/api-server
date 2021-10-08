'use strict';

module.exports = (err, req, res, next) => {
  if(err){
    res.status(500).json({
      status: 500,
      message: err.message ? err.message : err
    })
  }
}