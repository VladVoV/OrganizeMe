import React from "react";
import {Routes, Route } from "react-router-dom";
import MainPage from "./Pages/Main page";
// import ToDoListPage from "./Pages/To-Do List Page";
import Calendar from "./Pages/Calendar";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Home from "./Pages/Main page";
import Profile from "./Components/User/Profile";
import BoardUser from "./Pages/Board/BoardUser";
import BoardModerator from "./Pages/Board/BoardModerator";
import BoardAdmin from "./Pages/Board/BoardAdmin";
import Dashboard from "./Pages/Forum/Dashboard";
import CreatePost from "./Pages/Forum/CreatePost";
import PostPage from "./Pages/Forum/PostPage";
import TodoList from "./Pages/To-Do List Page";
import AddingTodo from "./Components/Todo/AddingTodo";
import EditTodo from "./Components/Todo/EditTodo";
import ArticlePage from "./Pages/ArticlePage";

function App() {
  return (
      <Routes>
          <Route path={'/'} element={<MainPage/>}/>
          <Route path={'/to-do'} element={<TodoList/>}/>
          <Route path={'calendar'} element={<Calendar/>}/>
          <Route path={"/home"} element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/user" element={<BoardUser/>}/>
          <Route path="/mod" element={<BoardModerator/>}/>
          <Route path="/admin" element={<BoardAdmin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/new-post" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>
          <Route path="/to-do-create" element={<AddingTodo/>}/>
          <Route path="/edit/:id" element={<EditTodo/>}/>
           <Route path="/articles" element={<ArticlePage/>}/>
      </Routes>
        );
}
export default App;
