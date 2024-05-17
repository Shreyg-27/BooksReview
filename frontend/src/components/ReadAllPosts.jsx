import React, { useState, useEffect } from 'react';
import CustomNavbar from './Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ReadAllPosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await fetch('https://booksreview-58y6.onrender.com/allposts');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    console.error('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAllPosts();
    }, []);

    const handleLogout = () => {
        // Remove the userEmail cookie
        Cookies.remove('userEmail');
        // Redirect to the login page
        navigate("/");
      };

    return (
        <div className="bg-gray-100 min-h-screen">
            <CustomNavbar onLogout={handleLogout}/>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Artciles written by our users!</h1>
                <div className="grid grid-cols-1 gap-4">
                    {posts.map(post => (
                        <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p>{post.article}</p>
                            <div className="mt-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{post.tags.join(', ')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReadAllPosts;
