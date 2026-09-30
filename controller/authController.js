const patientService = require('../service/patientService');

const register = async (req, res) => {
    const validBody = { ...(req.validated || {}) };
    try {

        const patient = await patientService.createPatient(validBody);
        const patientJson = patient.toJSON();
        const { password, ...publicData } = patientJson;
        return res.status(201).json({ message: 'User registered successfully', data: publicData });

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
