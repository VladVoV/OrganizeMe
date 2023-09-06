import React, { useState, useEffect } from 'react';

function ToDoListPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');


    useEffect(() => {
        // Fetch to-do items from the server
        fetch('/api/todos')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const addTask = async () => {
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newTask }),
            });

            if (response.status === 201) {
                const task = await response.json();
                setTasks([...tasks, task]);
                setNewTask('');
            }
        } catch (error) {
            console.error('Error adding to-do:', error);
        }
    };

    const deleteTask = (taskId) => {
        fetch(`/api/todos/${taskId}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedTasks = tasks.filter((task) => task._id !== taskId);
                setTasks(updatedTasks);
            })
            .catch((error) => console.error('Error deleting task:', error));
    };

    return (
        <div className="container mt-5">
            <h1>To-Do List</h1>
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
    );
}

export default ToDoListPage;
