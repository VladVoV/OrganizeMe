import React from "react";
import AuthService from "../../Services/auth.service";
import Navbar from "../Navbar";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div>
            <Navbar/>
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Id:</strong> {currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong> {currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
