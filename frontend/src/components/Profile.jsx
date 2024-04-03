import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract email from location state or set a default value if not available
    const { email } = location.state || {};

    // Define state variables for user profile data
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [gender, setGender] = useState('');
    const [bio, setBio] = useState('');
    const [favGenres, setFavGenres] = useState([]);
    const [favBooks, setFavBooks] = useState([]);
    const [favAuthors, setFavAuthors] = useState([]);

    useEffect(() => {
        // Example fetch request to get user profile data from backend
        const fetchUserProfileData = async () => {
            try {
                // Make a fetch request to your backend API to get user profile data
                const response = await fetch(`http://localhost:5000/${email}/profile`, {
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
                    setUserEmail(userData.email); // Renamed state variable
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

        // Call the function to fetch user profile data if email is available
        if (email) {
            fetchUserProfileData();
        }
    }, [email]); // Dependency array includes email

    // Render the profile component with user profile data
    return (
        <div>
            <h2>Welcome to Your Profile</h2>
            <p>This is your profile page. You can view and update your profile details here.</p>
            <ul>
                <li>Name: {name}</li>
                <li>Username: {username}</li>
                <li>Email: {userEmail}</li> 
                <li>Gender: {gender}</li>
                <li>Bio: {bio}</li>
                <li>Favorite Genres: {favGenres.join(', ')}</li>
                <li>Favorite Books: {favBooks.join(', ')}</li>
                <li>Favorite Authors: {favAuthors.join(', ')}</li>
            </ul>
            <button onClick={() => navigate('/createPost')}>Create Article</button>
            <button onClick={() => navigate('/myPosts')}> View My Articles</button>
            <button onClick={() => navigate('/updateDetails')}>Update My Details</button>
            <button onClick={() => navigate('/')}>Logout</button>
        </div>
    );
};

export default Profile;

