const mongoose = require("mongoose");

const CalendarEvent = mongoose.model(
    "CalendarEvent",
    new mongoose.Schema({
        title: String,
        date: Date,
        description: String,
    })
)

module.exports = CalendarEvent;
