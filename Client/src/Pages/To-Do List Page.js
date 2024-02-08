import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
import AuthService from "../Services/auth.service";

function ToDoListPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios
            .get('/api/todos')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const addTask = async () => {
        try {
            const response = await axios.post('/api/todos', { text: newTask});

            if (response.status === 201) {
                const task = response.data;
                setTasks([...tasks, task]);
                setNewTask('');
            }
        } catch (error) {
            console.error('Error adding to-do:', error);
        }
    };

    const deleteTask = (taskId) => {
        axios
            .delete(`/api/todos/${taskId}`)
            .then(() => {
                const updatedTasks = tasks.filter((task) => task._id !== taskId);
                setTasks(updatedTasks);
            })
            .catch((error) => console.error('Error deleting task:', error));
    };

    const deleteAllTasks = () => {
        axios
            .delete('/api/todos')
            .then(() => {
                setTasks([]);
            })
            .catch((error) => console.error('Error deleting tasks:', error));
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="d-flex justify-content-between">
                    <h1>To-Do List</h1>
                    {tasks.length === 0 ? null : (
                        <button
                            type="button"
                            className="btn btn-danger btn-sm float-right"
                            onClick={deleteAllTasks}
                        >
                            Delete all tasks
                        </button>
                    )}
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={addTask}>
                            Add
                        </button>
                    </div>
                </div>
                <ul className="list-group">
                    {tasks.map((task) => (
                        <li className="list-group-item" key={task._id}>
                            {task.text}
                            <button
                                type="button"
                                className="btn btn-danger btn-sm float-right"
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ToDoListPage;
