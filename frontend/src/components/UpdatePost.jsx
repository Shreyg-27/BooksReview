import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
                const response = await fetch(`http://localhost:5000/user/${userEmail}/posts`);
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
            const response = await fetch(`http://localhost:5000/${selectedPost._id}/updatepost`, {
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

    return (
        <div className="container my-2">
            <h1 className="h1 text-center">Edit Post</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h2>Select Post to Update:</h2>
                <ul>
                    {posts.map(post => (
                        <li key={post._id} onClick={() => handleSelectPost(post._id)}>{post.title}</li>
                    ))}
                </ul>
            </div>
            {selectedPost && (
                <form className="form" onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            id="content"
                            value={article}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter tags separated by commas"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </div>
    );
};

export default UpdatePost;
