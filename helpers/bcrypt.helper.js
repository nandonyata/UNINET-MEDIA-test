const bcrypt = require('bcryptjs');

const encryptPassword = (pasw) => {
  return bcrypt.hashSync(pasw);
};

const comparePassword = (pasw, encryptedPasw) => {
  return bcrypt.compareSync(pasw, encryptedPasw);
};

module.exports = { encryptPassword, comparePassword };
