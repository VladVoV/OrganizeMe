const db = require("../models")
const CalendarEvent = db.calendar

exports.retrieveCalendar = async (req, res) => {
    try {
        const userId = req.userId;
        const calendarEvents = await CalendarEvent.find({user: userId});
        res.status(200).json(calendarEvents);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve calendar items.' });
    }
}

exports.createCalendarEvent = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const userId = req.userId;
        const calendarEvent = new CalendarEvent({ title, date, description, user: userId });
        await calendarEvent.save();
        res.status(201).json(calendarEvent);
    } catch (error) {
        res.status(500).json({ error: 'Could not create calendar event.' });
    }
}

exports.deleteCalendarEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.userId;

        const deletedEvent = await CalendarEvent.findOneAndDelete({ _id: eventId, user: userId });

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Could not delete calendar event.' });
    }
};
