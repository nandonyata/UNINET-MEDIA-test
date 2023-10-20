const User = require('../models/user');
const Attendance = require('../models/attendance');
const { encryptPassword, comparePassword } = require('../helpers/bcrypt.helper');
const { signToken } = require('../helpers/jwt.helper');

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const { name, password, email } = req.body;
      if (!name || !password || !email) throw { message: 'Fill All Field' };

      const user = await User.create({ name, password: encryptPassword(password), email });

      res.status(201).json({ code: 201, user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { password, email } = req.body;
      if (!password || !email) throw { message: 'Fill All Field' };

      const findUser = await User.findOne({ email });
      if (!findUser) throw { message: 'Invalid email/password' };

      const comparePsw = comparePassword(password, findUser.password);
      if (!comparePsw) throw { message: 'Invalid email/password' };

      const accessToken = signToken({ email: findUser.email });

      res.status(201).json({ code: 201, accessToken, findUser });
    } catch (error) {
      next(error);
    }
  }

  static async clockIn(req, res, next) {
    try {
      const { longitude, latitude, ipAddress } = req.body;
      if (!longitude || !latitude || ipAddress) throw { message: 'Fill All Field' };

      const date = {
        first: new Date().setHours(0, 0, 0, 0),
        last: new Date().setHours(23, 59, 59, 99),
      };

      const findAttendanceToday = await Attendance.findOne({ user_id: req.user._id, createdAt: { $gte: date.first, $lte: date.last }, remark: 'Clock in', ipAddress });
      if (findAttendanceToday) throw { message: 'User hasnt clock out last attendance' };

      const attendance = await Attendance.create({ user_id: req.user._id, location: { longitude, latitude }, ipAddress });

      res.status(201).json({ code: 201, attendance });
    } catch (error) {
      next(error);
    }
  }

  static async clockOut(req, res, next) {
    try {
      const { id } = req.params;

      const findAttendance = await Attendance.findOne({ _id: id, remark: 'Clock in' });
      if (!findAttendance) throw { message: 'Data Not Found' };

      let user = req.user._id.toString();
      let attendanceStr = findAttendance.user_id.toString();

      if (user != attendanceStr) throw { message: 'Forbidden' };

      findAttendance.remark = 'Clock out';
      await findAttendance.save();

      res.status(200).json({ code: 200, message: 'Clocked out', findAttendance });
    } catch (error) {
      next(error);
    }
  }
};
