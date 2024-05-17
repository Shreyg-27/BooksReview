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

        const response = await fetch(`https://booksreview-58y6.onrender.com/user/${userEmail}/posts`);
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

  const navigateToUpdatePost = () => {
    navigate('/updatepost');
  };

  const handleDelete = async (postId) => {
    try {
      // Make a DELETE request to delete the post with the given postId
      const response = await fetch(`https://booksreview-58y6.onrender.com/${postId}/delete`, {
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
      <CustomNavbar onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8 bg-gray-100 mt-8">
        <ul className="mt-4">
          {articles.map(article => (
            <li key={article._id} className="border-b border-gray-200 py-4">
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-700 mb-2">{article.article}</p>
              <p className="text-gray-600 mb-2">Tags: {article.tags.join(', ')}</p>
              <p className="text-gray-600">Created At: {new Date(article.createdAt).toLocaleString()}</p>
              <button onClick={() => handleDelete(article._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-red-400">
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button onClick={navigateToCreateArticle} className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400">
          Create New Article
        </button>
        <button onClick={navigateToUpdatePost} className="mt-4 ml-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400">
          Update My Posts
        </button>

      </div>
    </div>
  );
};

export default ReadMyArticles;
