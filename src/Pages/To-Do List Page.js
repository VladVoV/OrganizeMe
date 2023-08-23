import React, { useState } from 'react';

function ToDoListPage() {
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [newTask, setNewTask] = useState(''); // State to hold the new task input

    // Function to add a new task
    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }
    };

    // Function to remove a task
    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
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
                {tasks.map((task, index) => (
                    <li className="list-group-item" key={index}>
                        {task}
                        <button
                            type="button"
                            className="btn btn-danger btn-sm float-right"
                            onClick={() => removeTask(index)}
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
