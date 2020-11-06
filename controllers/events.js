const Event = require('../models/Event');

const getEvents = (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: 'getEvents',
  });
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const savedEvent = await event.save();
    return res.status(200).json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error ocurred while working with the database'
    });
  }
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
