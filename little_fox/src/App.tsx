import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';

function App() {
    return (
        <Router>

            <Routes>
                <Route exact path="/" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;
