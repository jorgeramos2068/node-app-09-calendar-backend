const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJWT} = require('../helpers/jwt');

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
    // Generate JWT
    const token = await generateJWT(user.id, user.name);
    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'There was an error while saving'
    });
  }
};

const userLogin = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'There is an error while trying to log in'
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'There is an error while trying to log in'
      })
    }
    // Generate JWT
    const token = await generateJWT(user.id, user.name);
    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'There was an error while doing the login'
    });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;
  const name = req.name;
  // Regenerate new token
  const token = await generateJWT(uid, name);
  return res.json({
    ok: true,
    token
  });
};

module.exports = {
  createUser,
  userLogin,
  renewToken
};
