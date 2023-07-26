const {validationResult} = require('express-validator');

const createUser = (req, res) => {
  const {name, email, password} = req.body;
  return res.status(201).json({
    ok: true,
    msg: 'register',
    name,
    email
  });
};

const userLogin = (req, res) => {
  const {email, password} = req.body;
  return res.json({
    ok: true,
    msg: 'login'
  });
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: 'renew'
  });
};

module.exports = {
  createUser,
  userLogin,
  renewToken
};
