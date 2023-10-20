const { model, ObjectId, Schema } = require('../configs/mongoDb');

const Attendance = model(
  'attendance',
  new Schema(
    {
      user_id: {
        type: ObjectId,
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
      remark: {
        type: String,
        default: 'Clock in',
      },
    },

    { timestamps: true }
  )
);

module.exports = Attendance;
