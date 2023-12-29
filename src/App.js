import React from "react";
import {Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import MainPage from "./Pages/Main page";
import ToDoListPage from "./Pages/To-Do List Page";
import Calendar from "./Pages/Calendar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Main page";
import Profile from "./Components/Profile";
import BoardUser from "./Pages/BoardUser";
import BoardModerator from "./Pages/BoardModerator";
import BoardAdmin from "./Pages/BoardAdmin";

function App() {
  return (
      <Routes>
          <Route path={'/'} element={<MainPage/>}/>
          <Route path={'/to-do'} element={<ToDoListPage/>}/>
          <Route path={'calendar'} element={<Calendar/>}/>
          <Route path={"/home"} element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/user" element={<BoardUser/>}/>
          <Route path="/mod" element={<BoardModerator/>}/>
          <Route path="/admin" element={<BoardAdmin/>}/>
      </Routes>
        );
}
export default App;
