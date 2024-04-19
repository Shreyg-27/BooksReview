import React, { useEffect, useState } from "react";
import CustomNavbar from "./Navbar";
import Cookies from 'js-cookie';
import { useNavigate, Link } from "react-router-dom";
import fetchBooksDataWithAxios from "../services/Books";

const BooksData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        fetchData();
    }, [searchTerm]);

    const fetchData = async () => {
        try {
            const result = await fetchBooksDataWithAxios(searchTerm);
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim() !== "") {
            setLoading(true);
            await delay(1000);
            fetchData();
        }
    };

    const handleLogout = () => {
        Cookies.remove('userEmail');
        navigate("/");
    };

    return (
        <div className="bg-gray-100">
            <CustomNavbar onLogout={handleLogout} />
            <div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none">
                        Search
                    </button>
                    <button onClick={() => setSearchTerm("")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-md ml-2 focus:outline-none">
                        Clear
                    </button>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : data ? (
                    <div>
                        {data.map((book) => (
                            <div key={book.book_id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                                <p className="text-gray-700 mb-2">Author: {book.author.first_name} {book.author.last_name}</p>
                                <p className="text-gray-700 mb-2">Genres: {book.genres && book.genres.join(", ")}</p> {/* Check if genres exists */}
                                <img src={book.cover} alt={book.title} className="max-w-xs h-auto mb-2" />
                                <p className="text-gray-700 mb-2">Rating: {book.rating}</p>
                                <p className="text-gray-700 mb-2">Plot: {book.plot}</p>
                                <a href={book.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">More Info</a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No data available.</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/fantasy" className="group relative">
                        <div className="bg-white h-64 overflow-hidden rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
                            <img src="https://th.bing.com/th/id/OIP.Mwr1Dkf1Or0B2xFa7B14hgHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Fantasy Books" className="w-full h-full object-cover object-center" />
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-gray-800">Fantasy</h3>
                    </Link>
                    <Link to="/romance" className="group relative">
                        <div className="bg-white h-64 overflow-hidden rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
                            <img src="https://th.bing.com/th/id/OIP.6x2Db_Xa-RoQrdfSr1IkGAHaFj?w=227&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Romance Books" className="w-full h-full object-cover object-center" />
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-gray-800">Romance</h3>
                    </Link>
                    <Link to="/mystery" className="group relative">
                        <div className="bg-white h-64 overflow-hidden rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
                            <img src="https://th.bing.com/th/id/OIP._MR3f7KT7SJiNGeHCGAiDAHaLG?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Mystery Books" className="w-full h-full object-cover object-center" />
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-gray-800">Mystery</h3>
                    </Link>
                    <Link to="/sciencefiction" className="group relative">
                        <div className="bg-white h-64 overflow-hidden rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
                            <img src="https://th.bing.com/th/id/OIP.PNoUJxELy4ns54mbyN1hvgHaEK?w=313&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Science Fiction Books" className="w-full h-full object-cover object-center" />
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-gray-800">Science Fiction</h3>
                    </Link>
                    <Link to="/classics" className="group relative">
                        <div className="bg-white h-64 overflow-hidden rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
                            <img src="https://th.bing.com/th/id/OIP.8q9cFpE0yNfW9-d1WrLnSQHaEK?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Classics Books" className="w-full h-full object-cover object-center" />
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-gray-800">Classics</h3>
                    </Link>
                    <Link to="/fiction" className="group relative">
                        <div className="bg-white h-64 overflow-hidden rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
                            <img src="https://th.bing.com/th/id/OIP.lGEXkoNbxSTpWkjERyrWCwHaFS?w=255&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Fiction Books" className="w-full h-full object-cover object-center" />
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-gray-800">Fiction</h3>
                    </Link>
                    <Link to="/literature" className="group relative">
                        <div className="bg-white h-64 overflow-hidden rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
                            <img src="https://th.bing.com/th/id/OIP.VwtmznfAXZgXIafrVV4cGAHaEo?w=305&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Literature Books" className="w-full h-full object-cover object-center" />
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-gray-800">Literature</h3>
                    </Link>
                    <Link to="/adventure" className="group relative">
                        <div className="bg-white h-64 overflow-hidden rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
                            <img src="https://th.bing.com/th/id/OIP.52KP3y6JxpvozZIUecUYGwHaEo?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Adventure Books" className="w-full h-full object-cover object-center" />
                        </div>
                        <h3 className="text-lg font-semibold mt-2 text-gray-800">Adventure</h3>
                    </Link>
                    
                </div>
            </div>
        </div>
        </div>
    );
};

export default BooksData;
