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
            console.log(response.data.Quotes);

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
        <div>
            <CustomNavbar onLogout={handleLogout} />
            <h1>Quotes to motivate you!</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {quotes.map((quote, index) => (
                        <div key={index}>
                            <h2>{quote.quote}</h2>
                            <p>Author: {quote.author}</p>
                            <p>Category: {quote.category}</p>
                            <p>Description: {quote.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quotes;
