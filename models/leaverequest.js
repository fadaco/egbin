'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LeaveRequest.init({
    typeOfLeave: DataTypes.ENUM(['sick leave', 'exam leave', 'annual leave', 'compassionate leave']),
    dateRequested: DataTypes.DATE,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    resumptionDate: DataTypes.DATE,
    dateApproved: DataTypes.DATE,
    initialLeaveBalance: DataTypes.INTEGER,
    finalLeaveBalanceAfterApproval: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.ENUM(['pending', 'rejected', 'approved'])
  }, {
    sequelize,
    modelName: 'LeaveRequest',
  });
  return LeaveRequest;
};