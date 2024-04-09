const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/posts");
const {create_post, get_all_post, getPostsByEmail, update_post, delete_post} = require("../Controllers/postController");

const router = express.Router();

router.post('/:email', create_post);
router.get('/allposts', get_all_post);
router.get('/user/:email/posts', getPostsByEmail);
router.put('/:id/updatepost', update_post);
router.delete('/:email/delete', delete_post);

module.exports = router;
