const {validationResult} = require('express-validator');
const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    //const {name, email, password} = req.body;
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({
      ok: true,
      msg: 'register',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'There was an error while saving'
    });
  }
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
