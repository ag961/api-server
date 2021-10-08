'use strict';

const Movies = (sequelize, DataTypes) => sequelize.define('Movies', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.INTEGER,
  }
})

module.exports = Movies;