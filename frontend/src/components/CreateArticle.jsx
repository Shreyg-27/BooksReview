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
            const response = await fetch(`https://booksreview-58y6.onrender.com/${userEmail}`, {
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
            <div className="bg-gray-100 max-w-md mx-auto mt-16 px-6">
                <h2 className="text-3xl font-bold mb-6">Create Article</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="article" className="block text-sm font-medium leading-5 text-gray-700">Article Content:</label>
                        <textarea
                            id="article"
                            value={article}
                            onChange={(event) => setArticle(event.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium leading-5 text-gray-700">Tags (comma-separated):</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(event) => setTags(event.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );


};

export default CreateArticle;
