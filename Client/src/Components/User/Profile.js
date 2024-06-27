import React from "react";
import AuthService from "../../Services/auth.service";
import Navbar from "../Navbar";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white">
                                <h3 className="mb-0">
                                    <strong>{currentUser.username}'s</strong> Profile
                                </h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <strong>Id:</strong>
                                    <span className="badge bg-secondary ms-2">{currentUser.id}</span>
                                </div>
                                <div className="mb-3">
                                    <strong>Email:</strong>
                                    <span className="ms-2">{currentUser.email}</span>
                                </div>
                                <div className="mb-3">
                                    <strong>Roles:</strong>
                                    <span className="ms-2">{currentUser.roles.join(", ")}</span>
                                </div>
                                <div>
                                    <strong>Authorities:</strong>
                                    <ul className="list-group mt-2">
                                        {currentUser.roles &&
                                            currentUser.roles.map((role, index) => (
                                                <li key={index} className="list-group-item">
                                                    {role}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
