import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import AdminPanel from "./components/Admin/AdminPanel";
import CoursesPage from "./components/Course/CoursesPage";
import CourseDetails from "./components/Course/CourseDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginForm />} />
                <Route path="/admin/*" element={localStorage["role"] === "admin" ? <AdminPanel /> : <LoginForm/>} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
