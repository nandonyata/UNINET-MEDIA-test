const { model } = require('../configs/mongoDb');

const userSchema = model('user', {
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    longitude: Number,
    latitude: Number,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
