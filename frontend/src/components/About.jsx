import React from "react";
import CustomNavbar from "./Navbar";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the userEmail cookie
        Cookies.remove('userEmail');
        // Redirect to the login page
        navigate("/");
    };

    return (
        <div>
            <CustomNavbar onLogout={handleLogout} />
            <h1 className="text-3xl font-bold underline">About Our Books Review App</h1>
            <p>
                Welcome to our Books Review App! This is a platform where you can discover and review books from various genres.
            </p>
            <p>
                Our app allows you to explore adventure books, along with many other genres, providing details about the author, pages, rating, plot, and more.
            </p>
            <p>
                Additionally, you can enjoy fun facts, answer quiz questions, and find inspirational quotes related to books.
            </p>
            <p>
                Whether you're an avid reader or just getting started, our app has something for everyone. Join our community of book lovers today!
            </p>
        </div>
    );
};

export default About;
