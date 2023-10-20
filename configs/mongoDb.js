const {
  model,
  Schema,
  default: mongoose,
  Types: { ObjectId },
} = require('mongoose');

const connectDb = () => mongoose.connect('mongodb://127.0.0.1:27017/uninet-media');

module.exports = {
  connectDb,
  model,
  Schema,
  ObjectId,
};
