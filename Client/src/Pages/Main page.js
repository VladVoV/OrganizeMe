import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import UserService from "../Services/user.service";

function MainPage() {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Welcome to the Organize Me!</h1>
                        <p>
                            The Organize Me is a tool to help you stay organized and manage your tasks, assignments,
                            and important events efficiently throughout your academic journey.
                        </p>
                        <p>
                            Features of the Student Planner include:
                        </p>
                        <ul>
                            <li>Interactive Calendar to schedule and view events</li>
                            <li>To-Do List to manage your tasks and assignments</li>
                            <li>Reminders to stay on top of important deadlines</li>
                            <li>Customizable Settings to personalize your experience</li>
                        </ul>
                        <p>
                            Ready to get started? Choose one of the options below:
                        </p>
                        {/*<Router>*/}
                        {/*  <div className="row">*/}
                        {/*    <div className="col-md-6 mb-2">*/}
                        {/*      <Link to="/register" className="btn btn-primary btn-block">Register</Link>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-md-6 mb-2">*/}
                        {/*      <Link to="/login" className="btn btn-secondary btn-block">Login</Link>*/}
                        {/*    </div>*/}
                        {/*  </div>*/}

                        {/*  <Switch>*/}
                        {/*    <Route path="/register" component={Register} />*/}
                        {/*    <Route path="/login" component={Login} />*/}
                        {/*  </Switch>*/}
                        {/*</Router>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
