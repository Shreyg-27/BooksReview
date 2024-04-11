import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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

    // Function to fetch user data from backend
    const getSingleUser = async (userEmail) => {
        try {
            const response = await fetch(`http://localhost:5000/${userEmail}/profile`);
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
            const response = await fetch(`http://localhost:5000/${userEmail}`, {
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
        <div className="container my-2">
            <h1 className="h1 text-center">Edit User Data</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="form" onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="favGenres" className="form-label">Favorite Genres</label>
                    <input
                        type="text"
                        className="form-control"
                        id="favGenres"
                        value={favGenres.join(', ')} // Convert array to comma-separated string for display
                        onChange={(e) => setFavGenres(e.target.value.split(/[,\s]+/).map(tag => tag.trim()))} // Convert comma-separated string to array
                    />

                    <small className="text-muted">Enter favorite genres separated by commas</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="favAuthors" className="form-label">Favorite Authors</label>
                    <input
                        type="text"
                        className="form-control"
                        id="favAuthors"
                        value={favAuthors.join(', ')} // Convert array to comma-separated string for display
                        onChange={(e) => setFavAuthors(e.target.value.split(',').map(author => author.trim()))} // Convert comma-separated string to array
                    />
                    <small className="text-muted">Enter favorite authors separated by commas</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="favBooks" className="form-label">Favorite Books</label>
                    <input
                        type="text"
                        className="form-control"
                        id="favBooks"
                        value={favBooks.join(', ')} // Convert array to comma-separated string for display
                        onChange={(e) => setFavBooks(e.target.value.split(',').map(book => book.trim()))} // Convert comma-separated string to array
                    />
                    <small className="text-muted">Enter favorite books separated by commas</small>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );

};

export default Update;
