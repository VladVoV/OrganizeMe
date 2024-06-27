import React, { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import '../CSS/Calendar.css';

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
        axios
            .get('/api/calendar')
            .then((response) => {
                setCalendarData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching calendar data:', error);
            });
    }, []);

    useEffect(() => {
        const filteredNotes = calendarData.filter((event) => {
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
        axios
            .post('/api/calendar', newEvent)
            .then((response) => {
                console.log('Event added successfully:', response.data);
                setNewEvent({ title: '', description: '', date: new Date() });
            })
            .catch((error) => {
                console.error('Error adding event:', error);
            });
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`/api/calendar/${eventId}`);
            axios
                .get('/api/calendar')
                .then((response) => {
                    setCalendarData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching calendar data:', error);
                });
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="card-title">My Calendar</h2>
                            </div>
                            <div className="card-body">
                                <Calendar onChange={handleDateChange} value={date} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Add Event</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleAddEvent}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            value={newEvent.title}
                                            onChange={(e) =>
                                                setNewEvent({ ...newEvent, title: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            rows="3"
                                            value={newEvent.description}
                                            onChange={(e) =>
                                                setNewEvent({ ...newEvent, description: e.target.value })
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            value={newEvent.date.toISOString().split('T')[0]}
                                            onChange={(e) =>
                                                setNewEvent({ ...newEvent, date: new Date(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Add Event
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-header">
                                <h3 className="card-title">Events for {date.toDateString()}</h3>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {selectedNotes.map((event) => (
                                        <li key={event.id} className="list-group-item">
                                            <h5 className="card-title">{event.title}</h5>
                                            <p className="card-text">{event.description}</p>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteEvent(event._id)}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyCalendar;
