const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  // x-token headers
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'There is no token'
    });
  }
  try {
    const {uid, name} = jwt.verify(token, process.env.JWT_SECRET_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    });
  }
  next();
};

module.exports = {
  validateJWT
};
