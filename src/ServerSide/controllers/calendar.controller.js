const db = require("../models")
const CalendarEvent = db.calendar

exports.retrieveCalendar = async (req, res) => {
    try {
        const calendarEvents = await CalendarEvent.find();
        res.status(200).json(calendarEvents);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve calendar items.' });
    }
}

exports.createCalendarEvent = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const calendarEvent = new CalendarEvent({ title, date, description });
        await calendarEvent.save();
        res.status(201).json(calendarEvent);
    } catch (error) {
        res.status(500).json({ error: 'Could not create calendar event.' });
    }
}
