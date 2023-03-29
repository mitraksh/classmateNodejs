'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  score.init({
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    outOf: DataTypes.INTEGER,
    percent: DataTypes.DECIMAL,
    grade: DataTypes.STRING,
    examinedBy: DataTypes.INTEGER,
    examId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'score',
    underscored: true,
    paranoid: true
  });
  return score;
};