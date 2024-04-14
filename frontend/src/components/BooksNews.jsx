import React, { useEffect, useState } from "react";
// import { fetchDataWithAxios } from "../services/BooksNews";
import fetchDataWithAxios from "../services/BooksNews";
import CustomNavbar from "./Navbar";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const BooksNews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataWithAxios();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Remove the userEmail cookie
    Cookies.remove('userEmail');
    // Redirect to the login page
    navigate("/");
  };

  return (

    <div>
      <CustomNavbar onLogout={handleLogout}/>
      <h1>List of Nominated books for romance</h1>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          {data.map((book) => (
          <div key={book.book_id}>
            <h2>{book.name}</h2>
            <p>Author: {book.author}</p>
            <img src={book.cover} alt={book.name} style={{ maxWidth: '200px' }} />
            <p>Votes: {book.votes}</p>
            <a href={book.url} target="_blank" rel="noopener noreferrer">More Info</a>
          </div>
        ))}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default BooksNews;
