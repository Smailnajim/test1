const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser(data) {
  const payload = { ...data };
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }
  const user = await User.create(payload);
  return user;
}

module.exports = {
  createUser,
};
