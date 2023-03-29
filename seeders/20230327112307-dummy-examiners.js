'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('examiners',[       
      {
        id: 1,
        first_name: 'admin',
        last_name: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        subject_module_id: 'CH112',
        is_admin: true,
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
