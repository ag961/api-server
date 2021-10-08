'use strict';

const Phones = (sequelize, DataTypes) => sequelize.define('Phones', {
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Phones;
 