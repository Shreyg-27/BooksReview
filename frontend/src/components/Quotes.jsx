import React, { useEffect, useState } from "react";
import CustomNavbar from "./Navbar";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Quotes = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        const options = {
            method: 'GET',
            url: 'https://get-quotes-api.p.rapidapi.com/quotes',
            headers: {
                'X-RapidAPI-Key': '7f757d3ab0msha3f2bb3500b4c7fp18d194jsne28649b3488a',
                'X-RapidAPI-Host': 'get-quotes-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            // Get random 25 quotes
            const randomQuotes = getRandomQuotes(response.data.Quotes, 25);
            setQuotes(randomQuotes);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // Function to get random quotes from an array
    const getRandomQuotes = (quotesArray, count) => {
        const shuffled = quotesArray.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
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
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Quotes to Motivate You!</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {quotes.map((quote, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-2">{quote.quote}</h2>
                                <p className="text-gray-600"><span className="font-semibold">Author:</span> {quote.author}</p>
                                <p className="text-gray-600"><span className="font-semibold">Category:</span> {quote.category}</p>
                                <p className="text-gray-600"><span className="font-semibold">Description:</span>{quote.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quotes;
