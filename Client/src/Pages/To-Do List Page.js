import React, { useEffect, useState} from 'react';
import '../CSS/Todo/TodoList.css';
import TodoComponent from '../Components/Todo/TodoItem';
import {toast, ToastContainer} from 'react-toastify';
import Table from '../Components/Todo/Table';
import todoService from '../Services/todos.service';
import Navbar from "../Components/Navbar";
import {Link, useLocation} from "react-router-dom";
import AuthService from "../Services/auth.service";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [currentUser, setCurrentUser] = useState(null)
    const [notificationTime, setNotificationTime] = useState(0);
    const location = useLocation();


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        const fetchTodos = async () => {
            try {
                const res = await todoService.fetchTodos();
                setTodos(res.data);
            } catch (err) {
                console.error(err);
                toast.error(err.message);
            }
        };

        fetchTodos();
    }, []);

    const handleNotification = (taskId) => {
        if (window.self !== window.top) {
            window.open(location.href);
            return;
        }

        const userEnteredTime = prompt("Enter the time for notification (in seconds):");
        const notificationTime = parseInt(userEnteredTime, 10);

        if (isNaN(notificationTime) || notificationTime <= 0) {
            alert("Invalid time entered. Please enter a positive number.");
            return;
        }

        const selectedTask = todos.find((task) => task._id === taskId);

        if (!selectedTask) {
            alert("Task not found. Please select a valid task.");
            return;
        }

        setNotificationTime(notificationTime);

        setTimeout(() => {
            if (Notification && Notification.permission === "granted") {
                new Notification(`Task notification: ${selectedTask.text}`);
            } else if (Notification && Notification.permission !== "denied") {
                Notification.requestPermission().then((status) => {
                    if (status === "granted") {
                        new Notification(`Task notification: ${selectedTask.text}`);
                    } else {
                        alert("Please allow notifications to receive task notifications.");
                    }
                });
            } else {
                alert("Please allow notifications to receive task notifications.");
            }
        }, notificationTime * 1000);
    };

    const todoList = () => todos.map((todo) => (
        <TodoComponent
            key={todo._id}
            todo={todo}
            setTodos={setTodos}
            handleNotification={handleNotification}
        />
    ));

    return (
        <div className='App'>
            <Navbar/>
            <Link to={'/to-do-create'}>
                <button
                    className={'btn btn-primary btn-nav'}>
                    Add new Todo
                </button>
            </Link>
                <Table label={`ToDo\'s von ${currentUser}`}
                       todoLength={todos.length}
                       todoList={todoList}
                />

            <ToastContainer
                position='bottom-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme='colored'
            />
        </div>
    );
};

export default TodoList;
