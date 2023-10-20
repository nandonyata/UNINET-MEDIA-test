const { model, Schema } = require('../configs/mongoDb');

const User = model(
  'user',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  })
);

module.exports = User;
