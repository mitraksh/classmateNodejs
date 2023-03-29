'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('scores',[       
      {
        id: 1,
        student_id: 'RG115',
        subject_id: 'CH112',
        score: 90,
        out_of: 100,
        percent:90.00,
        grade: 'A',
        examined_by: 1,
        exam_id: 'EX112',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
