import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CustomNavbar from './Navbar';

const ReadMyArticles = () => {
  const [articles, setArticles] = useState([]);
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Retrieve the user's email from the cookie
        const userEmail = Cookies.get('userEmail');
        if (!userEmail) {
          // If the email is not available in cookies, redirect to login
          window.location.href = '/login';
          return;
        }

        const response = await fetch(`http://localhost:5000/user/${userEmail}/posts`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setArticles(data);
        } else {
          console.error('Failed to fetch articles');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleLogout = () => {
    // Remove the userEmail cookie
    Cookies.remove('userEmail');
    // Redirect to the login page
    navigate("/");
  };

  const navigateToCreateArticle = () => {
    navigate('/createarticle');
  };

  const navigateToUpdatPost = () => {
    navigate('/updatepost');
  };



  const handleDelete = async (postId) => {
    try {
      // Make a DELETE request to delete the post with the given postId
      const response = await fetch(`http://localhost:5000/${postId}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If the deletion is successful, filter out the deleted post from the articles array
        setArticles(prevArticles => prevArticles.filter(article => article._id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <CustomNavbar onLogout={handleLogout}/>
      <h2>My Articles</h2>
      <button onClick={navigateToCreateArticle}>Create New Article</button>
      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.article}</p>
            <p>Tags: {article.tags.join(', ')}</p>
            <p>Created At: {new Date(article.createdAt).toLocaleString()}</p>
            <button onClick={() => handleDelete(article._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={navigateToUpdatPost}>Update My Posts</button>
    </div>
  );
};

export default ReadMyArticles;


