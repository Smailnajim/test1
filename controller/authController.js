const patientService = require('../service/patientService');
const authService = require('../service/authService');

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

const login = async (req, res) => {
    const { email, password, isPatient = true } = req.validated || {};
    try {
        const result = await authService.login({ email, password, isPatient });
        if (!result) return res.status(401).json({ message: 'Invalid credentials' });
        const account = result.account;
        const token = result.token;
        const accountJson = typeof account.toJSON === 'function' ? account.toJSON() : account;
        const { password: _p, ...publicData } = accountJson;
        return res.status(200).json({ token, data: publicData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const me = async (req, res) => {
    const account = req.account;
    if (!account) return res.status(401).json({ message: 'Not authenticated' });
    const accountJson = account.toJSON();
    const { password: _p, ...publicData } = accountJson;
    return res.status(200).json({ data: publicData, type: req.accountType || 'unknown' });
};

module.exports = {
    register,
    login,
    me,
};
