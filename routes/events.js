const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const {validateJWT} = require('../middlewares/validate-jwt');
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');

// Routes: /api/events
router.get('/', validateJWT, getEvents);

router.post('/', validateJWT, createEvent);

router.put(
  '/:id',
  [validateJWT],
  updateEvent
);

router.delete(
  '/:id',
  [validateJWT],
  deleteEvent
);















/*const {validateFields} = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt');
const {createUser, userLogin, renewToken} = require('../controllers/auth');

// Routes: /api/auth
router.post(
  '/new',
  [
    check('name', 'Name field is mandatory').not().isEmpty(),
    check('email', 'Email field is mandatory and must be a valid mail').isEmail(),
    check('password', 'Password is mandatory and must be 6 characters long').isLength({min: 6}),
    validateFields
  ],
  createUser
);
router.post(
  '/',
  [
    check('email', 'Email field is mandatory and must be a valid mail').isEmail(),
    check('password', 'Password is mandatory and must be 6 characters long').isLength({min: 6}),
    validateFields
  ],
  userLogin
);
router.get('/renew', validateJWT, renewToken);*/

module.exports = router;
