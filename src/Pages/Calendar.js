import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function MyCalendar() {
    const [date, setDate] = React.useState(new Date());
    const [calendarData, setCalendarData] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);

    useEffect(() => {
        // Make the API request to fetch calendar data when the component mounts
        axios.get('/api/calendar')
            .then(response => {
                setCalendarData(response.data);
            })
            .catch(error => {
                console.error('Error fetching calendar data:', error);
            });
    }, []);

    useEffect(() => {
        // Filter and set the notes for the selected date
        const filteredNotes = calendarData.filter(event => {
            const eventDate = new Date(event.date); // Assuming 'date' is the date property in your API data
            return eventDate.toDateString() === date.toDateString();
        });
        setSelectedNotes(filteredNotes);
    }, [date, calendarData]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div>
            <Header/>
            <h2>My Calendar</h2>
            <Calendar
                onChange={handleDateChange}
                value={date}
            />
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
    );
}

export default MyCalendar;
