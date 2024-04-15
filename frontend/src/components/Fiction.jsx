import React, { useEffect, useState } from "react";
import CustomNavbar from "./Navbar";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Fiction = () => {
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
                'genres[]': 'fiction'
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
        <div>
            <CustomNavbar onLogout={handleLogout} />
            <h1>Top Mystery Books</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {books.slice(0, 25).map((book, index) => (
                        <div key={index}>
                            <h2>{book.title}</h2>
                            <p>Author: {book.author.first_name} {book.author.last_name}</p>
                            <p>Pages: {book.pages}</p>
                            <p>Rating: {book.rating}</p>
                            <p>Plot: {book.plot}</p>
                            <img src={book.cover} alt={book.title} style={{ maxWidth: '200px' }} />
                            <a href={book.url} target="_blank" rel="noopener noreferrer">More Info</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Fiction;
