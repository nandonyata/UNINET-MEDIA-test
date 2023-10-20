const jwt = require('jsonwebtoken');
const SECRET = 'saesaeasesaeagqg3131313';

const signToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  signToken,
  verifyToken,
};
