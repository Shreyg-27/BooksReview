const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/posts");
const {create_post, get_all_post, get_post_by_id, update_post, delete_post} = require("../Controllers/postController");

const router = express.Router();

router.post('/:id', create_post);
router.get('/allposts', get_all_post);
router.get('/user/:id/posts', get_post_by_id);
router.put('/:id/updatepost', update_post);
router.delete('/:id/delete', delete_post);

module.exports = router;
