const patientService = require('../service/patientService');

const createPatient = async (req, res) => {
  const validBody = { ...(req.validated || {}) };

  try {
    const patient = await patientService.createPatient(validBody);
    const patientJson = patient.toJSON();
    const { password, ...publicData } = patientJson;

    return res.status(201).json({
      message: 'Patient created successfully',
      data: publicData,
    });
  } catch (err) {
    if (err && err.name === 'SequelizeUniqueConstraintError') {
      const errors = err.errors ? err.errors.map((e) => e.message) : [];
      return res.status(409).json({ message: 'Conflict', errors });
    }

    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getPatients = async (req, res) => {
  const query = { ...(req.queryValidated || {}) };

  try {
    const result = await patientService.getPatients({
      search: query.search,
      page: query.page,
      limit: query.limit,
    });

    return res.status(200).json({
      message: 'Patients fetched successfully',
      ...result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createPatient,
  getPatients,
};
