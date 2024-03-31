// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//     username: {
//         type: String, 
//         required: true,
//     },
//     title: {
//         type:String,
//         required:true,
//     },
//     article: {
//         type: String,
//     }, 
//     tags: [{
//         type: String,
//     }]
// },
// { timestamps: true });

// const Post = mongoose.model('Post', postSchema)
// module.exports = Post;


const mongoose = require("mongoose");
const User = require("./users"); // Import the User model

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    article: {
        type: String
    }, 
    tags: [{
        type: String
    }]
},
{ timestamps: true });

postSchema.pre('save', async function(next) {
    const user = await User.findById(this.userId);
    this.username = user.username;
    next();
});

const Post = mongoose.model('Post', postSchema)
module.exports = Post;
