const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const {isDate} = require('../helpers/isDate');
const {validateFields} = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt');
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');

// Routes: /api/events
router.get('/', validateJWT, getEvents);

router.post(
  '/',
  [
    validateJWT,
    check('title', 'Title is mandatory').not().isEmpty(),
    check('start', 'Start date is mandatory').custom(isDate),
    check('end', 'End date is mandatory').custom(isDate),
    validateFields
  ],
  createEvent
);

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

module.exports = router;
