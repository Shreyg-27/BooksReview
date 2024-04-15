import React, { useEffect, useState } from "react";
import CustomNavbar from "./Navbar";
import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";
import fetchBooksDataWithAxios from "../services/Books";



const BooksData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // State to store search term
    const navigate = useNavigate();

    // Utility function to introduce a delay
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        fetchData();
    }, [searchTerm]); // Update data when searchTerm or selectedGenres change

    const fetchData = async () => {
        try {
            const result = await fetchBooksDataWithAxios(searchTerm);
            console.log(result);
            setData(result);
            setLoading(false);
        } catch (error) {
            // Handle error
            console.error(error);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim() !== "") {
            setLoading(true);
            await delay(1000); // Add a delay of 1 second (1000 milliseconds)
            fetchData();
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
            <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button> {/* Button to trigger search */}
            <button onClick={() => setSearchTerm("")}>Clear</button> {/* Button to clear the search */}
            {loading ? (
                <p>Loading...</p>
            ) : data ? (
                <div>
                    {data.map((book) => (
                        <div key={book.book_id}>
                            <h2>{book.title}</h2>
                            <p>Author: {book.author.first_name} {book.author.last_name}</p>
                            <p>Genres: {book.genres && book.genres.join(", ")}</p> {/* Check if genres exists */}
                            <img src={book.cover} alt={book.title} style={{ maxWidth: '200px' }} />
                            <p>Rating: {book.rating}</p>
                            <p>Plot: {book.plot}</p>
                            <a href={book.url} target="_blank" rel="noopener noreferrer">More Info</a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No data available.</p>
            )}
            <div>
                <h2>Pick your genres to explore top books!</h2>
                <div>
                    <Link to="/fantasy"><button>Fantasy</button></Link>
                    <Link to="/romance"><button>Romance</button></Link>
                    <Link to="/mystery"><button>Mystery</button></Link>
                    <Link to="/sciencefiction"><button>Science Fiction</button></Link>
                    <Link to="/classics"><button>Classics</button></Link>
                    <Link to="/fiction"><button>Fiction</button></Link>
                    <Link to="/literature"><button>Literature</button></Link>
                    <Link to="/adventure"><button>Adventure</button></Link>
                </div>
            </div>
        </div>
    );
};

export default BooksData;
