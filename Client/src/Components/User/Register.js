import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import '../../CSS/User/Register.css'

import AuthService from "../../Services/auth.service";
import Navbar from "../Navbar";

const Register = () => {
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setMessage("");
        setSuccessful(false);

        try {
            const response = await AuthService.register(data.username, data.email, data.password);
            setMessage(response.data.message);
            setSuccessful(true);
        } catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            if (resMessage.includes("Username")) {
                setError("username", {
                    type: "manual",
                    message: resMessage,
                });
            }

            if (resMessage.includes("Email")) {
                setError("email", {
                    type: "manual",
                    message: resMessage,
                });
            }

            if (resMessage.includes("Password")) {
                setError("password", {
                    type: "manual",
                    message: resMessage,
                });
            }

            setSuccessful(false);
        }
    };

    return (
        <div>
        <Navbar/>
            <div className="col-md-12">
                <div className="card card-container register-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card rounded-circle w-25 h-25"
                    />

                    <form onSubmit={handleSubmit(onSubmit)} >
                        {!successful && (
                            <div className="register-form">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        {...register('username', { required: 'This field is required!' })}
                                    />
                                    <div className="invalid-feedback">{errors.username?.message}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        {...register('email', {
                                            required: 'This field is required!',
                                            validate: value => isEmail(value) || 'This is not a valid email.'
                                        })}
                                    />
                                    <div className="invalid-feedback">{errors.email?.message}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        {...register('password', {
                                            required: 'This field is required!',
                                            validate: value => (value.length >= 6 && value.length <= 40) || 'The password must be between 6 and 40 characters.'
                                        })}
                                    />
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
