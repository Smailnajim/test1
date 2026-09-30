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

const getPatientById = async (req, res) => {
  const { id } = req.params || {};

  try {
    const patient = await patientService.getPatientById(id);
    const patientJson = patient.toJSON();
    const { password, ...publicData } = patientJson;

    return res.status(200).json({
      message: 'Patient fetched successfully',
      data: publicData,
    });
  } catch (err) {
    if (err && err.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatePatient = async (req, res) => {
  const validBody = { ...(req.validated || {}) };
  const { id } = req.params || {};

  try {
    const patient = await patientService.updatePatient(id, validBody);
    const patientJson = patient.toJSON();
    const { password, ...publicData } = patientJson;

    return res.status(200).json({
      message: 'Patient updated successfully',
      data: publicData,
    });
  } catch (err) {
    if (err && err.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (err && err.name === 'SequelizeUniqueConstraintError') {
      const errors = err.errors ? err.errors.map((e) => e.message) : [];
      return res.status(409).json({ message: 'Conflict', errors });
    }

    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params || {};

  try {
    await patientService.deletePatient(id);

    return res.status(200).json({
      message: 'Patient deleted successfully',
      data: { id },
    });
  } catch (err) {
    if (err && err.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
