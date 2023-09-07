import React from "react";
import {Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import MainPage from "./Pages/Main page";
import ToDoListPage from "./Pages/To-Do List Page";
import Calendar from "./Pages/Calendar";

function App() {
  return (
      <Routes>
          <Route path={'/'} element={<MainPage/>}/>
          <Route path={'/to-do'} element={<ToDoListPage/>}/>
          <Route path={'calendar'} element={<Calendar/>}/>
      </Routes>
        );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
export default App;
