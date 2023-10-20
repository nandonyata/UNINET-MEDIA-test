const errorHandler = (err, req, res, next) => {
  let status = 500;
  let msg = err.message || 'Internal Server Errror';

  console.log(err, '>> RAW ERROR');
  console.log(err.message ? err.message : '-', '>> ERR MESSAGE');

  if (err.message) {
    if (err.message === 'Fill All Field' || err.message.includes('E11000 duplicate key error collection:') || err.message === 'Invalid email/password') {
      status = 400;
    }

    if (err.message === 'Invalid Token' || err.message === 'User hasnt clock out last attendance') {
      status = 401;
    }

    if (err.message === 'Data Not Found') {
      status = 404;
    }

    if (err.message === 'Forbidden') {
      status = 403;
    }
  }

  res.status(status).json({ code: status, msg });
};

module.exports = errorHandler;
