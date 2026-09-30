const userService = require('../service/userService');

const createUser = async (req, res) => {
    const validBody = { ...(req.validated || {}) };
    try {

        const user = await userService.createUser(validBody);
        const userJson = user.toJSON();
        const { password, ...publicData } = userJson;
        return res.status(201).json({ message: 'User created', data: publicData });

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
    createUser,
};
