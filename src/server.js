'use strict';

const express = require('express');
const app = express();
const logger = require('./middleware/logger.js');
const notFoundHandler = require('./error-handlers/404');
const serverErrorHandler = require('./error-handlers/500');
const movieRoutes = require('./routes/movieRoutes');
const phoneRoutes = require('./routes/phoneRoutes')


app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.status(200).send("Hello, World!"))

app.use('/movies', movieRoutes);
app.use('/phones', phoneRoutes);


app.use('*', notFoundHandler);
app.use(serverErrorHandler);

const start = (port) => {
  if (!port) { throw new Error('missing port') };
  app.listen(port, () => { console.log(`Server listening on ${port}`) });
}

module.exports = {
  start,
  server: app
};