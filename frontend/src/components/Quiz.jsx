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
            console.log(response.data.fact);

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
            console.log(response.data.fact);

            setDogFact(response.data.fact);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };


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
            console.log(response.data);

            setQuiz(response.data);
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
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>Questions to answer</h1>
                    {quiz.map((ques, index) => (
                        <div key={ques.id}>
                            <p>{ques.question}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* cat fact */}
            <div>
                <h1>Random Cat Fact!</h1>
                <p>{catFact}</p>
            </div>
            {/* dog fact */}
            <div>
                <h1>Random Dog Fact!</h1>
                <p>{dogFact}</p>
            </div>
        </div>
    );
};

export default Quiz;
