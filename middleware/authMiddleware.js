const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

async function authenticate(req, res, next) {
  const auth = req.headers.authorization || req.headers.Authorization || '';
  const parts = auth.toString().split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const { sub, type } = payload;
    const Model = type === 'patient' ? Patient : User;
    const account = await Model.findByPk(sub);
    if (!account) return res.status(401).json({ message: 'Invalid token' });
    req.account = account;
    req.accountType = type;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {
  authenticate,
};
