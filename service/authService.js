const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

async function login({ email, password, isPatient = true }) {
  const Model = isPatient ? Patient : User;
  const account = await Model.findOne({ where: { email } });
  if (!account) return null;
  const stored = account.password;
  if (!stored) return null;
  const match = await bcrypt.compare(password, stored);
  if (!match) return null;

  const type = isPatient ? 'patient' : 'user';
  const payload = { sub: account.id, type, email: account.email };
  if (!isPatient && account.role) payload.role = account.role;

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { account, token, type };
}

module.exports = {
  login,
};
