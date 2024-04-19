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

    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <CustomNavbar onLogout={handleLogout} />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Welcome to BooksReview</h1>
                    <p className="text-lg text-gray-700">Your go-to platform for discovering, reviewing, and sharing your favorite books and your views with the community!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8"> {/* Added margin-top */}
                    <div className="bg-white shadow-md p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">About Us</h2>
                        <br />
                        <p>BooksReview is a community-driven platform dedicated to helping book lovers discover, review, and share their favorite reads. Whether you're looking for your next adventure or want to connect with fellow readers, BooksReview has something for everyone.</p>
                    </div>
                    <div className="bg-white shadow-md p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">What We Do</h2>
                        <p>BooksReview allows you to:</p>
                        <ul className="list-disc ml-6">
                            <li>Discover and explore articles written by other users</li>
                            <li>Read articles from external sources</li>
                            <li>Write and share your own articles with the community</li>
                            <li>Enjoy Fun Questions and Facts</li>
                            <li>Explore interesting facts and trivia about books</li>
                            <li>Find inspirational quotes to uplift your spirits</li>
                        </ul>
                    </div>
                    <div className="bg-white shadow-md p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
                        <br />
                        <p className="italic">"BooksReview helped me discover new books that I never would have found on my own!" - John Doe</p>
                        <br />
                        <br />
                        <p className="italic">"As a book lover, I appreciate the community aspect of BooksReview. It's great to connect with other readers." - Jane Smith</p>
                    </div>
                </div>
            </div>
            <footer className="text-center text-gray-600 mt-auto"> {/* Moved buttons inside footer */}
                <p className="mb-2">Follow us on social media:</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-blue-500 hover:text-blue-700">Twitter</a>
                    <a href="#" className="text-blue-500 hover:text-blue-700">Facebook</a>
                    <a href="#" className="text-blue-500 hover:text-blue-700">Instagram</a>
                </div>
                <p className="mt-4">© 2024 BooksReview. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
