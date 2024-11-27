const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Titel und Datum sind erforderlich" });
    }
    const event = await Event.create({
      title,
      description,
      date,
      createdBy: req.user.id,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error("Fehler beim Erstellen des Events:", error.message);
    res.status(500).json({ message: "Fehler beim Erstellen des Events" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    res.status(200).json(events);
  } catch (error) {
    console.error("Fehler beim Abrufen der Events:", error.message);
    res.status(500).json({ message: "Fehler beim Abrufen der Events" });
  }
};

module.exports = { createEvent, getEvents };