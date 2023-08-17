import React from 'react';
import logo from '../Images/logo.png';
import '../CSS/Header.css';

function Header() {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <img className={'logo-image'} src={logo} alt={'logo'}/>
            </div>

            <h1 className="navbar-brand">Student Planner</h1>

            {/* Navigation Menu */}
            <nav className="navbar-nav ml-auto">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">To-Do List</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Calendar</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Reminders</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Settings</a>
                    </li>
                </ul>
            </nav>

            {/* User Profile */}
            <div className="navbar-text">
                {/* User profile details */}
            </div>

            {/* Other header elements */}
            {/* Search bar, date display, notifications, etc. */}
        </header>
    );
}

export default Header;
