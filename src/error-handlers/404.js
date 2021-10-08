'use strict';

module.exports = (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'not found what you were looking for'
  })
}