const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // Add email validation
        validate: {
            validator: function(v) {
                // Simple email validation regex
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Non-binary']
    },
    bio: {
        type: String,
    }, 
    fav_genres: [{
        type: String,
    }], 
    fav_books: [{
        type: String,
    }], 
    fav_authors: [{
        type: String,
    }]
},
{ timestamps: true });

const User = mongoose.model('User', userSchema)
module.exports = User;
