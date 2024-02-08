import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import '../CSS/Calendar.css'

function MyCalendar() {
    const [date, setDate] = React.useState(new Date());
    const [calendarData, setCalendarData] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: new Date(),
    });

    useEffect(() => {
        axios.get('/api/calendar')
            .then(response => {
                setCalendarData(response.data);
            })
            .catch(error => {
                console.error('Error fetching calendar data:', error);
            });
    }, []);

    useEffect(() => {
        const filteredNotes = calendarData.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
        setSelectedNotes(filteredNotes);
    }, [date, calendarData]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleAddEvent = (e) => {
        e.preventDefault();

        axios.post('/api/calendar', newEvent)
            .then(response => {
                console.log('Event added successfully:', response.data);

                setNewEvent({
                    title: '',
                    description: '',
                    date: new Date(),
                });
            })
            .catch(error => {
                console.error('Error adding event:', error);
            });
    };

    return (
        <div>
            <Header/>
            <div className="calendar--container">
                <h2>My Calendar</h2>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                />
                <form onSubmit={handleAddEvent}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            value={newEvent.date.toISOString().split('T')[0]} // Convert to 'YYYY-MM-DD' format
                            onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                        />
                    </label>
                    <button type="submit">Add Event</button>
                </form>
                <div>
                    <h3>Events for {date.toDateString()}:</h3>
                    <ul>
                        {selectedNotes.map(event => (
                            <li key={event.id}>
                                <div>{event.title}</div>
                                <div>{event.description}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MyCalendar;
