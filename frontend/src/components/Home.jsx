// Home.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';

const Home = () => {

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login')
    }

    const navigateToSignup = () => {
        navigate('/signup');
    }

    return (
        <div>
            <h1>Welcome to BooksReview</h1>
            <button onClick={navigateToLogin}>Login</button>
            <br />
            <button onClick={navigateToSignup}>Sign Up</button>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default Home;
