import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    gender: '',
    bio: '',
    fav_genres: [],
    fav_books: [],
    fav_authors: []
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend for signup
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Signup successful:', data);
      navigate('/thankyou');
      
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium leading-5 text-gray-700">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium leading-5 text-gray-700">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="fav_genres" className="block text-sm font-medium leading-5 text-gray-700">Favorite Genres:</label>
          <input
            type="text"
            name="fav_genres"
            value={formData.fav_genres}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="fav_books" className="block text-sm font-medium leading-5 text-gray-700">Favorite Books:</label>
          <input
            type="text"
            name="fav_books"
            value={formData.fav_books}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="fav_authors" className="block text-sm font-medium leading-5 text-gray-700">Favorite Authors:</label>
          <input
            type="text"
            name="fav_authors"
            value={formData.fav_authors}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
