import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CustomNavbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    // Define state variables for user profile data
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [gender, setGender] = useState('');
    const [bio, setBio] = useState('');
    const [favGenres, setFavGenres] = useState([]);
    const [favBooks, setFavBooks] = useState([]);
    const [favAuthors, setFavAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the user's email from the cookie
        const userEmail = Cookies.get('userEmail');
        if (userEmail) {
            // Example fetch request to get user profile data from backend
            const fetchUserProfileData = async () => {
                try {
                    // Make a fetch request to your backend API to get user profile data
                    const response = await fetch(`http://localhost:5000/${userEmail}/profile`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            // You might need to include authentication headers if required
                        },
                    });

                    // Check if the response is successful
                    if (response.ok) {
                        // Parse the response JSON data
                        const userData = await response.json();
                        // Update state variables with user profile data
                        setName(userData.name);
                        setUsername(userData.username);
                        setUserEmail(userData.email);
                        setGender(userData.gender);
                        setBio(userData.bio);
                        setFavGenres(userData.fav_genres);
                        setFavBooks(userData.fav_books);
                        setFavAuthors(userData.fav_authors);
                    } else {
                        // Handle error if response is not successful
                        console.error('Failed to fetch user profile data');
                    }
                } catch (error) {
                    // Handle any network or unexpected errors
                    console.error('Error fetching user profile data:', error);
                }
            };

            // Call the function to fetch user profile data
            fetchUserProfileData();
        } else {
            // Redirect to login page if email is not available in cookie
            window.location.href = '/login';
        }
    }, []); // Empty dependency array ensures useEffect runs only once
    const handleLogout = () => {
        // Remove the userEmail cookie
        Cookies.remove('userEmail');
        // Redirect to the login page
        navigate("/");
      };

    return (
        <div className='bg-gray-100'>
            <CustomNavbar onLogout={handleLogout}/>
            <div className="flex justify-center mt-8">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Your Profile Information</h2>
                    <dl className="divide-y divide-gray-200">
                        <div className="py-3">
                            <dt className="text-sm font-medium leading-5 text-gray-500">Name</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">{name}</dd>
                        </div>
                        <div className="py-3">
                            <dt className="text-sm font-medium leading-5 text-gray-500">Username</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">{username}</dd>
                        </div>
                        <div className="py-3">
                            <dt className="text-sm font-medium leading-5 text-gray-500">Email Address</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">{userEmail}</dd>
                        </div>
                        <div className="py-3">
                            <dt className="text-sm font-medium leading-5 text-gray-500">Gender</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">{gender}</dd>
                        </div>
                        <div className="py-3">
                            <dt className="text-sm font-medium leading-5 text-gray-500">Bio</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">{bio}</dd>
                        </div>
                        <div className="py-3">
                            <dt className="text-sm font-medium leading-5 text-gray-500">Favorite Genres</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">{favGenres.join(', ')}</dd>
                        </div>
                        <div className="py-3">
                            <dt className="text-sm font-medium leading-5 text-gray-500">Favorite Books</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">{favBooks.join(', ')}</dd>
                        </div>
                        <div className="py-3">
                            <dt className="text-sm font-medium leading-5 text-gray-500">Favorite Authors</dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">{favAuthors.join(', ')}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>

    );
};

export default Profile;
