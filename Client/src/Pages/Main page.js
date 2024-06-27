import React from "react";
import Navbar from "../Components/Navbar";

function MainPage() {
    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <h1 className="display-4">Welcome to Student planner!</h1>
                            <p className="lead">Stay organized and manage your tasks, events, and resources efficiently.</p>
                            <p className="lead">Here are the main tools offered by the website</p>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">To-Do List</h5>
                                        <p className="card-text">Manage your tasks and assignments in a simple and intuitive way.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">Calendar</h5>
                                        <p className="card-text">Schedule and view your events and deadlines in a comprehensive calendar.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">Forum</h5>
                                        <p className="card-text">Engage with your peers, discuss topics, and share knowledge.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">Articles</h5>
                                        <p className="card-text">Read and explore a variety of articles on various topics.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <p>Don't have an account yet?</p>
                            <a href="/register" className="btn btn-success me-2">Register</a>
                            <a href="/login" className="btn btn-outline-success">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
