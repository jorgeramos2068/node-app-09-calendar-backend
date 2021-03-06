const Event = require('../models/Event');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('user', 'name');
    return res.status(200).json({
      ok: true,
      events: events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error ocurred while working with the database'
    });
  }
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

const updateEvent = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    // Verify that the event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'No event was found with that id'
      });
    }
    // Verify that the user is the creator
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have permissions to update this record'
      });
    }
    // Update event
    const newEvent = {
      ...req.body,
      user: uid
    };
    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {new: true});
    return res.status(200).json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error ocurred while working with the database'
    });
  }
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    // Verify that the event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'No event was found with that id'
      });
    }
    // Verify that the user is the creator
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have permissions to update this record'
      });
    }
    // Delete event
    await Event.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error ocurred while working with the database'
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
