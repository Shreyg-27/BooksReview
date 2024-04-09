import React, { useState } from "react";
import Cookies from 'js-cookie';
import CustomNavbar from "./Navbar";
import {useNavigate} from 'react-router-dom'

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(event) =>{
        event.preventDefault();

        const userEmail = Cookies.get('userEmail');

        if (!userEmail){
            console.error('User email not found in cookies');
            return;
        }
        const formData = {
            title: title,
            article: article,
            tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated string to array
        };

        try{
            const response = await fetch(`http://localhost:5000/${userEmail}`, {
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                console.log('Article created successfully');
                // Clear form fields after successful submission
                setTitle('');
                setArticle('');
                setTags('');
            } else {
                console.error('Failed to create article');
            }
        } catch (error) {
            console.error('Error creating article:', error);
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
            <CustomNavbar onLogout={handleLogout}/>
            <h2>Create Article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="article">Article Content:</label>
                    <textarea
                        id="article"
                        value={article}
                        onChange={(event) => setArticle(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tags">Tags (comma-separated):</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(event) => setTags(event.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );


};

export default CreateArticle;