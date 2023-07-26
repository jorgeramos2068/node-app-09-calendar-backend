const createUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'register'
  });
};

const userLogin = (req, res) => {
  res.json({
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
