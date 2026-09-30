const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Patient = require('../models/Patient');

async function createPatient(data) {
  const payload = { ...data };
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const patient = await Patient.create(payload);
  return patient;
}

async function getPatientById(id) {
  const patient = await Patient.findByPk(id);

  if (!patient) {
    const error = new Error('Patient not found');
    error.name = 'NotFoundError';
    throw error;
  }

  return patient;
}

async function updatePatient(id, data) {
  const patient = await getPatientById(id);
  const payload = { ...data };

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  await patient.update(payload);
  return patient;
}

async function getPatients({ search = '', page = 1, limit = 10 } = {}) {
  const where = {};
  const searchTerm = String(search || '').trim();
  const pageNumber = Number(page) > 0 ? Number(page) : 1;
  const limitNumber = Number(limit) > 0 ? Number(limit) : 10;

  if (searchTerm) {
    where[Op.or] = [
      { fullName: { [Op.iLike]: `%${searchTerm}%` } },
      { email: { [Op.iLike]: `%${searchTerm}%` } },
      { CIN: { [Op.iLike]: `%${searchTerm}%` } },
      { phone: { [Op.iLike]: `%${searchTerm}%` } },
    ];
  }

  const offset = (pageNumber - 1) * limitNumber;

  const { count, rows } = await Patient.findAndCountAll({
    where,
    limit: limitNumber,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    data: rows,
    page: pageNumber,
    limit: limitNumber,
    total: count,
    totalPages: Math.ceil(count / limitNumber) || 0,
  };
}

module.exports = {
  createPatient,
  getPatientById,
  updatePatient,
  getPatients,
};
