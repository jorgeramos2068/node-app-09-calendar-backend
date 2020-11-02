const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const userToFind = await User.findOne({email: email});
    if (userToFind) {
      return res.status(400).json({
        ok: false,
        msg: 'That email already exists in the database'
      });
    }
    const user = new User(req.body);
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
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
