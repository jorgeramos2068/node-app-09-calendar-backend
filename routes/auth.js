const express = require('express');
const router = express.Router();
const {createUser, userLogin, renewToken} = require('../controllers/auth');

// Routes: /api/auth
router.post('/new', createUser);
router.post('/', userLogin);
router.get('/renew', renewToken);

module.exports = router;
