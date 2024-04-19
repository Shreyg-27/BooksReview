import React, { useEffect, useState } from "react";
import CustomNavbar from "./Navbar";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [catFact, setCatFact] = useState("");
    const [dogFact, setDogFact] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuiz();
        fetchCatFact();
        fetchDogFact();
    }, []);

    const fetchQuiz = async () => {
        const options = {
            method: 'GET',
            url: 'https://current-affairs-of-india.p.rapidapi.com/today-quiz',
            headers: {
                'X-RapidAPI-Key': '7f757d3ab0msha3f2bb3500b4c7fp18d194jsne28649b3488a',
                'X-RapidAPI-Host': 'current-affairs-of-india.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setQuiz(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const fetchCatFact = async () => {
        const options = {
            method: 'GET',
            url: 'https://random-cat-fact.p.rapidapi.com/',
            headers: {
                'X-RapidAPI-Key': '7f757d3ab0msha3f2bb3500b4c7fp18d194jsne28649b3488a',
                'X-RapidAPI-Host': 'random-cat-fact.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setCatFact(response.data.fact);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const fetchDogFact = async () => {
        const options = {
            method: 'GET',
            url: 'https://random-dog-facts.p.rapidapi.com/',
            headers: {
                'X-RapidAPI-Key': '7f757d3ab0msha3f2bb3500b4c7fp18d194jsne28649b3488a',
                'X-RapidAPI-Host': 'random-dog-facts.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setDogFact(response.data.fact);
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
            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-8">Questions to Keep You Updated with Current Affairs</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quiz.map((ques, index) => (
                                <div key={ques.id} className="bg-white rounded-lg shadow-md p-4">
                                    <p className="text-lg">{ques.question}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
