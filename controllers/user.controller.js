module.exports = class UserController {
  static async register(req, res, next) {
    try {
      res.status(201).json({ code: 201 });
    } catch (error) {
      next(error);
    }
  }
};
