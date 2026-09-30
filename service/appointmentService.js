const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

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

module.exports = {
  createAppointment,
};
