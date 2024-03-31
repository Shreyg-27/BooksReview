const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const {userSignUp, UserLogin, UserUpdate} = require("../Controllers/authController");

const router = express.Router();

router.post('/signup', userSignUp);
router.get('/login', UserLogin);
router.patch('/:id', UserUpdate);


module.exports = router;

