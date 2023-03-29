'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exam.init({
    examId: DataTypes.STRING,
    conductedOn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'exam',
    underscored: true,
    paranoid: true
  });
  return exam;
};