const express = require("express");
const { protect } = require("../middlewares/protect");
const { getRedditPosts, savePost, reportPost, getUserSavedPosts } = require("../controllers/postController");
const router = express.Router();

router.get("/reddit", getRedditPosts);


router.post("/save-post", savePost);

router.post("/report-post", reportPost);

router.get("/saved-posts", protect, getUserSavedPosts);

module.exports = router;
