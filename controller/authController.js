const bcrypt = require('bcrypt');
const Patient = require('../models/Patient');

const register = async (req, res) => {
  const validBody = { ...(req.validated || {}) };
  try {
    if (validBody.password) {
      const hashed = await bcrypt.hash(validBody.password, 10);
      validBody.password = hashed;
    }

    const patient = await Patient.create(validBody);
    console.log('Patient created:', patient.toJSON());
    // const patientJson = typeof patient.toJSON === 'function' ? patient.toJSON() : patient;
    // const { password, ...publicData } = patientJson;
    return res.status(201).json({ message: 'User registered successfully', data: patient.toJSON() });
  } catch (err) {
    if (err && err.name === 'SequelizeUniqueConstraintError') {
      const errors = err.errors ? err.errors.map(e => e.message) : [];
      return res.status(409).json({ message: 'Conflict', errors });
    }
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
};
