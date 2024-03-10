import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import todoService from '../Services/todos.service';

function ToDoListPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    let [notificationTime, setNotificationTime] = useState(0);
    const location = useLocation();

    useEffect(() => {
        todoService.fetchTodos()
            .then((response) => setTasks(response.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const addTask = async () => {
        try {
            const response = await todoService.createTodo(newTask);

            if (response.status === 201) {
                const task = response.data;
                setTasks([...tasks, task]);
                setNewTask('');
            }
        } catch (error) {
            console.error('Error adding to-do:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await todoService.deleteTodo(taskId);
            const updatedTasks = tasks.filter((task) => task._id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const deleteAllTasks = async () => {
        try {
            await todoService.deleteAllTodos();
            setTasks([]);
        } catch (error) {
            console.error('Error deleting tasks:', error);
        }
    };

    const handleNotification = (taskId) => {
        if (window.self !== window.top) {
            window.open(location.href);
            return;
        }

        const userEnteredTime = prompt("Enter the time for notification (in seconds):");
        notificationTime = parseInt(userEnteredTime, 10);

        if (isNaN(notificationTime) || notificationTime <= 0) {
            alert("Invalid time entered. Please enter a positive number.");
            return;
        }

        const selectedTask = tasks.find((task) => task._id === taskId);

        if (!selectedTask) {
            alert("Task not found. Please select a valid task.");
            return;
        }

        setNotificationTime(notificationTime);

        setTimeout(() => {
            if (Notification && Notification.permission === "granted") {
                const n = new Notification(`Task notification: ${selectedTask.text}`);
            } else if (Notification && Notification.permission !== "denied") {
                Notification.requestPermission().then((status) => {
                    if (status === "granted") {
                        const n = new Notification(`Task notification: ${selectedTask.text}`);
                    } else {
                        alert("Please allow notifications to receive task notifications.");
                    }
                });
            } else {
                alert("Please allow notifications to receive task notifications.");
            }
        }, notificationTime * 1000);
    };


    return (
        <div>
            <Navbar />
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
                            <button
                                type="button"
                                className="btn btn-success btn-sm float-right mr-2"
                                onClick={() => handleNotification(task._id)}
                            >
                                Notify
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ToDoListPage;
