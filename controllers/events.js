// const {validationResult} = require('express-validator');

const getEvents = (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: 'getEvents',
  });
};

const createEvent = (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: 'createEvent',
  });
};

const updateEvent = (req, res) => {
  const id = req.params.id;
  return res.status(200).json({
    ok: true,
    msg: 'updateEvent',
  });
};

const deleteEvent = (req, res) => {
  const id = req.params.id;
  return res.status(200).json({
    ok: true,
    msg: 'deleteEvent',
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
