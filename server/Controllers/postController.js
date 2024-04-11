const Post = require("../models/posts");
const User = require("../models/users");

// creating a post 
const create_post = async(req, res) =>{
    const {title, article, tags} = req.body;
    const {email} = req.params; 
    console.log(email);
    console.log(req.body);
    // const username = req.body.username; 
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const postAdded = await Post.create({
            userId: user._id,
            // username: username,
            title:title,
            article:article,
            tags:tags,
        });
        res.status(201).json(postAdded);
    } catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }   
}




// // get all the posts
const get_all_post = async (req, res) => {
    try {
        const showAll = await Post.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getPostsByEmail = async (req, res) => {
    const email = req.params.email; // Extract email from URL parameters
    try {
        // Find the user document based on the provided email
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        // Fetch posts associated with the user's id
        const posts = await Post.find({ userId: user._id });

        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts by email:', error);
        return res.status(500).json({ error: error.message });
    }
};



//  // put/patch/update data 
// const update_post = async (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     const { userId, username, title, article, tags } = req.body;
//     console.log(req.body);

//     try {
//         let updatedData = {
//             title,
//             article,
//             tags,
//         };
//         console.log(title)

//         // let updatedData = req.body; // Clone the request body


//         // Find and update the user by ID
//         const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
//             new: true,
//         });
//         console.log(updatedPost);
//         if (!updatedPost) {
//             // If no post found with the given ID
//             return res.status(404).json({ error: "Post not found" });
//         }
//         res.status(200).json(updatedPost);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// };

const update_post = async (req, res) => {
    const { id } = req.params;
    const { title, article, tags } = req.body;

    try {
        // Find and update the post by ID
        const updatedPost = await Post.findByIdAndUpdate(id, { title, article, tags }, { new: true });
        
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: error.message });
    }
};








// delete data
// const delete_post = async (req, res) => {
//     const { email } = req.params;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         const deletedPost = await Post.findOneAndDelete({ userId: user._id });
//         if (!deletedPost) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         res.status(200).json({ message: 'Post deleted successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// }

const delete_post = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Find and delete the post by ID
        const deletedPost = await Post.findByIdAndDelete(id);
        
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {create_post, get_all_post, getPostsByEmail, update_post, delete_post};






