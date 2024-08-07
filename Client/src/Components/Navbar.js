import React, { useState, useEffect } from "react";
import logo from '../Images/logo.png';
import '../CSS/Header.css';
import {Link} from "react-router-dom";

import AuthService from "../Services/auth.service";

import EventBus from "../Common/EventBus";


function Navbar() {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <Link className="nav-link" to={'/'}>
                    <img className={'logo-image'} src={logo} alt={'logo'}/>
                </Link>
            </div>

            <h1 className="navbar-brand">Student Planner</h1>

            <nav className="navbar-nav ml-auto">
                <ul className="navbar-nav">
                    {currentUser && (
                        <li className="nav-item">
                            <Link className="nav-link" to={'/to-do'}>
                                <div>To-Do List</div>
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className="nav-item">
                        <Link className="nav-link" to={'/calendar'}>
                            <div>Calendar</div>
                        </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/dashboard"} className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/articles"} className="nav-link">
                                Articles
                            </Link>
                        </li>
                    )}
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}

                </ul>
            </nav>

            <div className="navbar-text">
            </div>

        </header>
    );
}

export default Navbar;
