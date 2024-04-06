import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import CoursesPage from "./components/Course/CoursesPage.tsx";
import CourseDetails from "./components/Course/CourseDetails.tsx";

function App() {
    return (
        <Router>

            <Routes>
                <Route exact path="/" element={<LoginForm />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
