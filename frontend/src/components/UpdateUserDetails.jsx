import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CustomNavbar from "./Navbar";

const Update = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [bio, setBio] = useState("");
    const [favGenres, setFavGenres] = useState([]);
    const [favBooks, setFavBooks] = useState([]);
    const [favAuthors, setFavAuthors] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Load user data from cookies when component mounts
        const userEmail = Cookies.get("userEmail");
        if (!userEmail) {
            // If userEmail is not present in cookies, navigate to login
            navigate("/login");
        } else {
            // Fetch user data when component mounts
            getSingleUser(userEmail);
        }
    }, []);

    const handleLogout = () => {
        // Remove the userEmail cookie
        Cookies.remove('userEmail');
        // Redirect to the login page
        navigate("/");
      };

    // Function to fetch user data from backend
    const getSingleUser = async (userEmail) => {
        try {
            const response = await fetch(`https://booksreview-58y6.onrender.com/${userEmail}/profile`);
            console.log(response);
            const result = await response.json();
            if (!response.ok) {
                setError(result.error);
            } else {
                setName(result.name);
                setUsername(result.username);
                setGender(result.gender);
                setBio(result.bio);
                setFavGenres(result.fav_genres);
                setFavBooks(result.fav_books);
                setFavAuthors(result.fav_authors);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setError("Error fetching user data");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userEmail = Cookies.get("userEmail");
        const updatedUser = { name, username, password, gender, bio, fav_genres: favGenres, fav_books: favBooks, fav_authors: favAuthors };

        try {
            const response = await fetch(`https://booksreview-58y6.onrender.com/${userEmail}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });
            const result = await response.json();
            if (!response.ok) {
                setError(result.error);
            } else {
                console.log(result);
                navigate(`/profile/${userEmail}`);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Error updating user data");
        }
    };

    return (
        <div>
        <CustomNavbar onLogout={handleLogout}/>
            <h1 className="h1 text-center mt-8">Update My Details</h1>
            <div className="container mx-auto my-4 px-4 bg-gray-100">
                {error && <div className="alert alert-danger">{error}</div>}
                <form className="space-y-6 max-w-md mx-auto" onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">Username</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="favGenres" className="block text-sm font-medium leading-5 text-gray-700">Favorite Genres</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                            id="favGenres"
                            value={favGenres.join(', ')} // Convert array to comma-separated string for display
                            onChange={(e) => setFavGenres(e.target.value.split(/[,\s]+/).map(tag => tag.trim()))} // Convert comma-separated string to array
                        />
                        <small className="text-muted">Enter favorite genres separated by commas</small>
                    </div>
                    <div>
                        <label htmlFor="favAuthors" className="block text-sm font-medium leading-5 text-gray-700">Favorite Authors</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                            id="favAuthors"
                            value={favAuthors.join(', ')} // Convert array to comma-separated string for display
                            onChange={(e) => setFavAuthors(e.target.value.split(',').map(author => author.trim()))} // Convert comma-separated string to array
                        />
                        <small className="text-muted">Enter favorite authors separated by commas</small>
                    </div>
                    <div>
                        <label htmlFor="favBooks" className="block text-sm font-medium leading-5 text-gray-700">Favorite Books</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                            id="favBooks"
                            value={favBooks.join(', ')} // Convert array to comma-separated string for display
                            onChange={(e) => setFavBooks(e.target.value.split(',').map(book => book.trim()))} // Convert comma-separated string to array
                        />
                        <small className="text-muted">Enter favorite books separated by commas</small>
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

export default Update;
