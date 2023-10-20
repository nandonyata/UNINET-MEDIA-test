const { register, login, clockIn, clockOut } = require('../controllers/user.controller');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/clock-in', authentication, clockIn);
router.patch('/clock-out/:id', authentication, clockOut);

module.exports = router;
