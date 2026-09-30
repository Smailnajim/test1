const { Op } = require('sequelize');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const User = require('../models/User');

async function createAppointment(data) {
  const payload = { ...data };

  if (!payload.patientId) {
    const error = new Error('Patient is required');
    error.name = 'ValidationError';
    throw error;
  }

  const patient = await Patient.findByPk(payload.patientId);
  if (!patient) {
    const error = new Error('Patient not found');
    error.name = 'NotFoundError';
    throw error;
  }

  const appointment = await Appointment.create({
    appointmentDate: payload.appointmentDate,
    status: payload.status || 'pending',
    reason: payload.reason,
    notes: payload.notes || null,
    createdBy: payload.createdBy,
    patientId: payload.patientId,
  });

  return appointment;
}

async function getAppointments(filters = {}) {
  const { date, status } = filters;
  const where = {};

  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    where.appointmentDate = {
      [Op.between]: [start, end],
    };
  }

  if (status) {
    where.status = status;
  }

  const appointments = await Appointment.findAll({
    where,
    include: [
      {
        model: Patient,
        attributes: ['id', 'fullName', 'email', 'phone'],
      },
      {
        model: User,
        attributes: ['id', 'fullName', 'email', 'role'],
      },
    ],
    order: [['appointmentDate', 'DESC']],
  });

  return appointments;
}

module.exports = {
  createAppointment,
  getAppointments,
};
