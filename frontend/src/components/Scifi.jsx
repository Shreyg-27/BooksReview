import React, { useEffect, useState } from "react";
import CustomNavbar from "./Navbar";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ScienceFiction = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const options = {
            method: 'GET',
            url: 'https://books-api7.p.rapidapi.com/books/find/genres',
            params: {
                'genres[]': 'science fiction'
            },
            headers: {
                'X-RapidAPI-Key': '7f757d3ab0msha3f2bb3500b4c7fp18d194jsne28649b3488a',
                'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setBooks(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Remove the userEmail cookie
        Cookies.remove('userEmail');
        // Redirect to the login page
        navigate("/");
    };

    return (
        <div className="bg-gray-100">
            <CustomNavbar onLogout={handleLogout} />
            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Science Fiction Books to Read</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {books.slice(0, 12).map((book, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 flex mx-auto" style={{ maxWidth: '1000px' }}>
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Author:</span> {book.author.first_name} {book.author.last_name}</p>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Pages:</span> {book.pages}</p>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Rating: </span>{book.rating}</p>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Plot: </span> {book.plot}</p>
                                <a href={book.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">More Info</a>
                            </div>
                            <img src={book.cover} alt={book.title} className="max-w-xs h-auto mb-2 ml-4" style={{ maxWidth: '200px' }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ScienceFiction;
