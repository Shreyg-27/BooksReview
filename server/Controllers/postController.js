const Post = require("../models/posts");
const User = require("../models/users");

// creating a post 
const create_post = async(req, res) =>{
    const {title, article, tags} = req.body;
    const userId = req.params.id; 
    console.log(req.params.id);
    console.log(req.body);
    // const username = req.body.username; 
    try{
        const postAdded = await Post.create({
            userId: userId,
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

// // get single user by id maybe 
const get_post_by_id = async (req, res) => {
    const userId = req.params.id; 
    try {
        const userPosts = await Post.find({ userId: userId });
        res.status(200).json(userPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

//  // put/patch/update data 
const update_post = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { userId, username, title, article, tags } = req.body;
    console.log(req.body);

    try {
        let updatedData = {
            title,
            article,
            tags,
        };
        console.log(title)

        // let updatedData = req.body; // Clone the request body


        // Find and update the user by ID
        const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        console.log(updatedPost);
        if (!updatedPost) {
            // If no post found with the given ID
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// delete data
const delete_post = async (req, res) => {
    const { id } = req.params;
    try {
        const singlePost = await Post.findByIdAndDelete({ _id: id });
        res.status(200).json(singlePost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = {create_post, get_all_post, get_post_by_id, update_post, delete_post};






