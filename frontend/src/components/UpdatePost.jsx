import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CustomNavbar from "./Navbar";

const UpdatePost = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [title, setTitle] = useState("");
    const [article, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all posts of the user
        const fetchPosts = async () => {
            try {
                const userEmail = Cookies.get("userEmail");
                if (!userEmail) {
                    navigate("/login");
                    return;
                }
                const response = await fetch(`https://booksreview-58y6.onrender.com/user/${userEmail}/posts`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user's posts");
                }
                const postData = await response.json();
                setPosts(postData);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to fetch posts");
            }
        };
        fetchPosts();
    }, [navigate]);

    const handleSelectPost = (postId) => {
        const postToUpdate = posts.find(post => post._id === postId);
        if (postToUpdate) {
            setSelectedPost(postToUpdate);
            setTitle(postToUpdate.title);
            setContent(postToUpdate.article);
            setTags(postToUpdate.tags.join(", "));
        } else {
            setError("Post not found");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const userEmail = Cookies.get("userEmail");
            if (!userEmail) {
                navigate("/login");
                return;
            }
            const updatedPost = {
                title,
                article,
                tags: tags.split(",").map((tag) => tag.trim()),
            };
            console.log(selectedPost._id);
            const response = await fetch(`https://booksreview-58y6.onrender.com/${selectedPost._id}/updatepost`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPost),
            });
            if (!response.ok) {
                throw new Error("Failed to update post");
            }
            navigate(`/myposts`);
        } catch (error) {
            console.error("Error updating post:", error);
            setError("Failed to update post");
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
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="container mx-auto px-4 py-8 bg-white rounded-md shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Edit Post</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div>
                    <h2 className="text-lg font-bold mb-2">Select Post to Update:</h2>
                    <ul>
                        {posts.map(post => (
                            <li key={post._id} onClick={() => handleSelectPost(post._id)} className="cursor-pointer mb-2 hover:text-blue-500">{post.title}</li>
                        ))}
                    </ul>
                </div>
                {selectedPost && (
                    <form className="mt-4" onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                                id="content"
                                value={article}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="Enter tags separated by commas"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                    </form>
                )}
            </div>
        </div>
        </div>
    );
    
};

export default UpdatePost;
