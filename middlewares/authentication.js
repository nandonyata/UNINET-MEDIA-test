const { verifyToken } = require('../helpers/jwt.helper');
const User = require('../models/user');

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { message: 'Invalid Token' };

    const payload = verifyToken(access_token);

    const user = await User.findOne({ email: payload.email });

    if (!user) throw { message: 'Invalid Token' };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
