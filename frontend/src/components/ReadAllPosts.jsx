import React, { useState, useEffect } from 'react';
import CustomNavbar from './Navbar';

const ReadAllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/allposts');
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

    return (
        <div>
            <CustomNavbar />
            <h1>All Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.article}</p>
                        <p>Tags: {post.tags.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadAllPosts;
