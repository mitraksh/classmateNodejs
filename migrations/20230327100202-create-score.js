'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('scores', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      subject_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      score: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      out_of: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      percent: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      grade: {
        allowNull: true,
        type: Sequelize.STRING
      },
      examined_by:{
        allowNull: true,
        type: Sequelize.INTEGER
      },
      exam_id:{
        allowNull: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('scores');
  }
};