'use strict';

require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./lib/collection.js');
const moviesSchema = require('./movies.schema.js');
const phonesSchema = require('./phones.schema.js');


let sequelizeOptions = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
  : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const movieModel = moviesSchema(sequelize, DataTypes);
const phoneModel = phonesSchema(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Movies: new Collection(movieModel),
  Phones: new Collection(phoneModel)
}