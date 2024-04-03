const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const {userSignUp, UserLogin, UserUpdate, UserDetails} = require("../Controllers/authController");

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', UserLogin);
router.patch('/:id', UserUpdate);
router.get('/:email/profile', UserDetails);


module.exports = router;

