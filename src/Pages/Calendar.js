import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
    const [date, setDate] = React.useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div>
            <h2>My Calendar</h2>
            <Calendar
                onChange={handleDateChange}
                value={date}
            />
        </div>
    );
}

export default MyCalendar;
