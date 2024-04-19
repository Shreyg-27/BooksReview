import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Home = () => {

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login')
    }

    const navigateToSignup = () => {
        navigate('/signup');
    }

    return (
        <div className='bg-gray-100'>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">Welcome to BooksReview</h1>
                <p className="text-lg text-gray-700">Your go-to platform for discovering, reviewing, and sharing your favorite books!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8"> {/* Added margin-top */}
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Featured Books</h2>
                    <ul>
                        <li className="mb-2"><a href="https://www.goodreads.com/book/show/2767052-the-hunger-games/">The Hunger Games</a></li>
                        <li className="mb-2"><a href="https://www.goodreads.com/book/show/2657.To_Kill_a_Mockingbird">To Kill a Mocking Bird</a></li>
                        <li className="mb-2"><a href="https://www.goodreads.com/series/45175-harry-potter">Harry Potter</a></li>
                    </ul>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
                    <p className="italic">"BooksReview helped me discover new books that I never would have found on my own!" - John Doe</p>
                    <p className="italic">"As a book lover, I appreciate the community aspect of BooksReview. It's great to connect with other readers." - Jane Smith</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Latest Articles</h2>
                    <ul>
                        <li className="mb-2"><a href="https://time.com/collection/100-must-read-books-2021/">Must Read Books</a></li>
                        <li className="mb-2"><a href="https://www.penguinrandomhouse.com/articles/">Book Recommendations</a></li>
                        <li className="mb-2"><a href="https://reedsy.com/discovery/blog/best-short-stories">Short Stories</a></li>
                    </ul>
                </div>
            </div>
            <footer className="text-center text-gray-600 mt-auto"> {/* Moved buttons inside footer */}
                <div className="space-x-4 mb-8">
                    <button onClick={navigateToLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Login
                    </button>
                    <button onClick={navigateToSignup} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign Up
                    </button>
                </div>
                <p className="mb-2">Follow us on social media:</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-blue-500 hover:text-blue-700">Twitter</a>
                    <a href="#" className="text-blue-500 hover:text-blue-700">Facebook</a>
                    <a href="#" className="text-blue-500 hover:text-blue-700">Instagram</a>
                </div>
                <p className="mt-4">© 2024 BooksReview. All rights reserved.</p>
            </footer>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
        </div>
    );
};

export default Home;
