const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("express");

const userSignUp = (req, res) =>{
    const {username, password, name, email, gender, bio, fav_genres, fav_books, fav_authors} = req.body;
    // now check for the login thing
    User.findOne({email:email}).then(
        async user => {
            if (user){
                return res.status(400).json({error:"This email already exists!"});
            }
            else{
                const user = new User ({
                    username:username,
                    password:password,
                    name:name,
                    email:email,
                    gender:gender,
                    bio:bio,
                    fav_genres:fav_genres,
                    fav_books:fav_books,
                    fav_authors:fav_authors
                })
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                user.password = hash;
                user.save().then(
                    response=>{
                        res.status(200).json({
                            success:true,
                            result:response
                        })
                    }
                ).catch(err=>{
                    res.status(500).json({
                        error:err
                    })
                })
            }
        }).catch(err=>{
            res.status(500).json({
                error:err
            })
        })
}


const UserLogin = async(req, res) =>{
    const {email, password, username} = req.body;
    // Find the user by email or username
    User.findOne({$or: [{email: email}, {username: username}]}).then(
        user => {
            if (!user) {
                return res.status(404).json({error: "User not found"});
            } else {
                bcrypt.compare(password, user.password, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    if (data) {
                        return res.status(200).json({msg: "Login Done"});
                    } else {
                        return res.status(401).json({msg: "Invalid Credentials!"});
                    }
                });
            }
        }
    ).catch(err => {
        res.status(500).json({error: err});
    });
};


const UserUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, email, gender, username, password, fav_authors, fav_books, fav_genres, bio } = req.body;

    try {
        let updatedData = req.body; // Clone the request body

        // Check if the password field is present and not empty
        if (password) {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            // Set the hashed password in the updated data
            updatedData.password = hash;
        }

        // Find and update the user by ID
        const updateUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


// get details of a paticular user 
// const UserDetails = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Find the user by ID
//         const user = await User.findById(id);

//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // User found, return user details
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// const UserDetails = async (req, res) => {
//     const { email } = req.params;

//     try {
//         // Convert the id to ObjectId
//         const ObjectId = require('mongoose').Types.ObjectId;
//         const userId = new ObjectId(id);

//         // Find the user by ID
//         const user = await User.findById(userId);

//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // User found, return user details
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

const UserDetails = async (req, res) => {
    const { email } = req.params;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // User found, return user details
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = {userSignUp, UserLogin,UserUpdate, UserDetails};

