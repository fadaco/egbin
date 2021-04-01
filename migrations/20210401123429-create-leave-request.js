'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LeaveRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeOfLeave: {
        type: Sequelize.ENUM,
        values: ['sick leave', 'exam leave', 'annual leave', 'compassionate leave']
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      resumptionDate: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'rejected', 'approved']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LeaveRequests');
  }
};