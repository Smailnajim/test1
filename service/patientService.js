const bcrypt = require('bcrypt');
const Patient = require('../models/Patient');

async function createPatient(data) {
  const payload = { ...data };
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const patient = await Patient.create(payload);
  return patient;
}

module.exports = {
  createPatient,
};
