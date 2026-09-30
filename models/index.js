const sequelize = require('../config/database');
const User = require('./User');
const Patient = require('./Patient');
const Appointment = require('./Appointment');

module.exports = {
  sequelize,
  User,
  Patient,
  Appointment,
};
