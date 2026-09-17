'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Yemenipepole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


    }
  }
  Yemenipepole.init({
    yemeni_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Yemenipepole',
  });
  return Yemenipepole;
};